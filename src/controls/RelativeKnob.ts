import taktil from 'taktil';

export class RelativeKnob extends taktil.Control {
    enableMidiOut = false;

    minValue = -63;
    maxValue = 63;

    getControlInput({ data2 }: taktil.MidiMessage): taktil.ControlState {
        const value = data2 === 0 ? 0 : data2 < 64 ? -(64 - data2) : data2 - 64;
        return { value };
    }
}
