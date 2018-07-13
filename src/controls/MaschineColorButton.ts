import taktil from 'taktil';
import isEqual from 'lodash-es/isEqual';

import { rgb2hsv, SyncedInterval } from '../utils';
import { daw } from '../daw';

const colors = {
    playGreen: { r: 0.02, g: 1.0, b: 0.06 }, // matches machine play button color
    offWhite: { r: 0.75, g: 1.0, b: 0.35 }, // warm to match default maschine buttons
};

interface MaschineColorButtonState {
    value: number;
    color: taktil.Color;
    disabled: boolean;
    flashing: boolean;
    flashOn: boolean;
    accent: boolean;
}

export class MaschineColorButton extends taktil.Control<MaschineColorButtonState> {
    dimValue = 20;

    state = {
        value: 0,
        color: colors.offWhite,
        accent: false,
        disabled: false,
        flashing: false,
        flashOn: true,
    };

    flashInterval: SyncedInterval;

    constructor({ port = 0, status, data1 }: { port?: number; status: number; data1: number }) {
        super({ patterns: [{ port, status, data1 }], cacheOnMidiIn: false });
        this.patterns = [
            ...this.patterns,
            new taktil.MessagePattern({ status: this.hueStatus, data1 }),
            new taktil.MessagePattern({ status: this.saturationStatus, data1 }),
            new taktil.MessagePattern({ status: this.brightnessStatus, data1 }),
        ];
    }

    get hueStatus() {
        return this.status & 0xf0;
    }

    get saturationStatus() {
        return this.hueStatus + 1;
    }

    get brightnessStatus() {
        return this.hueStatus + 2;
    }

    getMidiOutput(state: MaschineColorButtonState): (taktil.MidiMessage | taktil.SysexMessage)[] {
        const doNotSaturate = isEqual(state.color, colors.offWhite);
        const hsb = rgb2hsv(state.color);
        const { data1, minValue, maxValue, dimValue } = this;
        let brightnessData2 =
            !this.activeComponent || state.disabled
                ? minValue
                : state.value === minValue
                    ? dimValue
                    : maxValue;
        if (brightnessData2 === maxValue && state.flashing) {
            brightnessData2 = state.flashOn ? maxValue : dimValue;
        }
        if (state.accent) {
            brightnessData2 =
                brightnessData2 === maxValue ? maxValue : Math.min(brightnessData2 + 50, maxValue);
        }
        let saturationData2 = doNotSaturate
            ? hsb.s
            : hsb.s === 0
                ? 0
                : 100 + Math.round((hsb.s / 127) * 27);
        if (state.accent) saturationData2 = Math.max(saturationData2 - 20, 0);
        return [
            ...super.getMidiOutput(state),
            new taktil.MidiMessage({ status: this.hueStatus, data1, data2: hsb.h, urgent: true }),
            new taktil.MidiMessage({
                status: this.saturationStatus,
                data1,
                data2: saturationData2,
                urgent: true,
            }),
            new taktil.MidiMessage({
                status: this.brightnessStatus,
                data1,
                data2: brightnessData2,
                urgent: true,
            }),
        ];
    }

    controlDidRender() {
        const {
            minValue,
            state: { value, flashing },
        } = this;
        if (value > minValue && flashing) {
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
