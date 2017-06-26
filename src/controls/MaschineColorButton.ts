import { SimpleControl, MidiMessage, SysexMessage, MessagePattern, Color } from 'taktil';
import { rgb2hsv, SyncedInterval } from '../utils';
import isEqual from 'lodash-es/isEqual';

const colors = {
    playGreen: { r: 0.02, g: 1.0, b: 0.06 }, // matches machine play button color
    offWhite: { r: 0.75, g: 1.0, b: 0.35 }, // warm to match default maschine buttons
};

interface MaschineColorButtonState {
    value: number;
    color: Color;
    disabled: boolean;
    flashing: boolean;
    flashOn: boolean;
    accent: boolean;
}

export default class MaschineColorButton extends SimpleControl<MaschineColorButtonState> {
    state = {
        value: 0,
        color: colors.offWhite,
        accent: false,
        disabled: false,
        flashing: false,
        flashOn: true,
    };

    flashInterval: SyncedInterval;

    constructor({
        port,
        inPort,
        outPort,
        status,
        data1,
    }: {
        port?: number;
        inPort?: number;
        outPort?: number;
        status: number;
        data1: number;
    }) {
        super({ port, inPort, outPort, status, data1 });
        this.patterns = [
            ...this.patterns,
            new MessagePattern({ status: this.hueStatus, data1 }),
            new MessagePattern({ status: this.saturationStatus, data1 }),
            new MessagePattern({ status: this.brightnessStatus, data1 }),
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

    getMidiOutput(state): (MidiMessage | SysexMessage)[] {
        const doNotSaturate = isEqual(state.color, colors.offWhite);
        const hsb = rgb2hsv(state.color);
        const { status, data1 } = this;
        let brightnessData2 = !this.activeComponent || state.disabled
            ? 0
            : state.value === 0 ? 20 : 127;
        if (brightnessData2 === 127 && state.flashing) brightnessData2 = state.flashOn ? 127 : 20;
        if (state.accent)
            brightnessData2 = brightnessData2 === 127 ? 127 : Math.min(brightnessData2 + 15, 127);
        let saturationData2 = doNotSaturate
            ? hsb.s
            : hsb.s === 0 ? 0 : 100 + Math.round(hsb.s / 127 * 27);
        if (state.accent) saturationData2 = Math.max(saturationData2 - 20, 0);
        return [
            ...super.getMidiOutput(state),
            new MidiMessage({ status: this.hueStatus, data1, data2: hsb.h }),
            new MidiMessage({
                status: this.saturationStatus,
                data1,
                data2: saturationData2,
            }),
            new MidiMessage({
                status: this.brightnessStatus,
                data1,
                data2: brightnessData2,
            }),
        ];
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
