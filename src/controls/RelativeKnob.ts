import taktil from 'taktil';

interface State {
    value: number;
}

export class RelativeKnob extends taktil.SimpleControl<State> {
    enableMidiOut = false;

    minValue = -63;
    maxValue = 63;

    state = { value: 0 };

    getInput({ data2 }: taktil.MidiMessage): State {
        const value = data2 === 0 ? 0 : data2 < 64 ? -(64 - data2) : data2 - 64;
        return { value };
    }
}
