import taktil from 'taktil';

export class RelativeKnob extends taktil.ControlChange {
    enableMidiOut = true;

    minValue = -63;
    maxValue = 63;

    getControlInput({ data2 }: taktil.MidiMessage): taktil.ControlState {
        const value = data2 === 0 ? 0 : data2 < 64 ? -(64 - data2) : data2 - 64;
        return { value };
    }

    getMidiOutput({ value }: taktil.ControlState) {
        const { port, status, data1 } = this;
        return [
            new taktil.MidiMessage({
                port,
                status,
                data1,
                data2: value > -1 ? value : 127 + value,
            }),
        ];
    }
}
