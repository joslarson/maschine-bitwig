import { SimpleControl, MidiMessage, SysexMessage, MessagePattern, Color } from 'taktil';
import { SyncedInterval } from '../utils';
import { daw } from '../daw';

interface State {
    value: number;
    color?: Color;
    disabled: boolean;
    flashing: boolean;
    flashOn: boolean;
}

export class MaschineButton extends SimpleControl<State> {
    state = { value: 0, flashing: false, flashOn: true, disabled: false };

    cacheOnMidiIn = false;
    flashInterval: SyncedInterval;

    getMidiOutput({ value, flashing, flashOn, disabled }): (MidiMessage | SysexMessage)[] {
        const { outPort: port, status, data1, minValue, maxValue } = this;
        let data2 = !this.activeComponent || disabled ? minValue : value;
        if (data2 === maxValue && flashing) data2 = flashOn ? maxValue : minValue;
        return [new MidiMessage({ port, status, data1, data2 })];
    }

    postRender() {
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
