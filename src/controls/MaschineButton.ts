import taktil from 'taktil';

import { SyncedInterval } from '../utils';
import { daw } from '../daw';

interface State {
    value: number;
    color?: taktil.Color;
    disabled: boolean;
    flashing: boolean;
    flashOn: boolean;
}

export class MaschineButton extends taktil.Control<State> {
    flashInterval: SyncedInterval;

    state = { value: 0, flashing: false, flashOn: true, disabled: false };

    constructor({ port = 0, status, data1 }: { port?: number; status: number; data1: number }) {
        super({ patterns: [{ port, status, data1 }], cacheOnMidiIn: false });
    }

    getMidiOutput({ value, flashing, flashOn, disabled }): taktil.MidiMessage[] {
        const { port, status, data1, minValue, maxValue } = this;
        let data2 = !this.activeComponent || disabled ? minValue : value;
        if (data2 === maxValue && flashing) data2 = flashOn ? maxValue : minValue;
        return [new taktil.MidiMessage({ port, status, data1, data2 })];
    }

    controlDidRender() {
        const { minValue, state: { value } } = this;
        if (value > minValue && this.state.flashing) {
            if (!this.flashInterval) {
                this.flashInterval = new SyncedInterval(
                    daw.transport,
                    isOddInterval => {
                        this.setState({ flashOn: isOddInterval });
                    },
                    1 / 2
                ).start();
            }
        } else if (this.flashInterval) {
            this.flashInterval.cancel();
            delete this.flashInterval;
        }
    }
}
