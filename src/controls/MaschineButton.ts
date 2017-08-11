import { SimpleControl, MidiMessage, SysexMessage, MessagePattern, Color } from 'taktil';
import { SyncedInterval } from '../utils';

interface State {
    value: number;
    color?: Color;
    disabled: boolean;
    flashing: boolean;
    flashOn: boolean;
}

export default class MaschineButton extends SimpleControl<State> {
    state = { value: 0, flashing: false, flashOn: true, disabled: false };

    cacheOnMidiIn = false;
    flashInterval: SyncedInterval;

    getMidiOutput({ value, flashing, flashOn, disabled }): (MidiMessage | SysexMessage)[] {
        const { outPort: port, status, data1 } = this;
        let data2 = !this.activeComponent || disabled ? 0 : value === 0 ? 0 : 127;
        if (data2 === 127 && flashing) data2 = flashOn ? 127 : 0;
        return [new MidiMessage({ port, status, data1, data2 })];
    }

    postRender() {
        if (this.state.value > 0 && this.state.flashing) {
            if (!this.flashInterval) {
                this.flashInterval = new SyncedInterval(isOddInterval => {
                    this.setState({ flashOn: isOddInterval });
                }, 1 / 2).start();
            }
        } else if (this.flashInterval) {
            this.flashInterval.cancel();
            delete this.flashInterval;
        }
    }
}
