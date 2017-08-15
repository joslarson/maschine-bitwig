import { Range, SimpleControl } from 'taktil';
import store from '../store';

type Options = { track: API.Track };

interface State {
    value: number;
    meter: number;
    isPlaying: boolean;
}

export default class VolumeRange extends Range<Options, State> {
    state: State = { value: 0, meter: 0, isPlaying: false };

    getOutput() {
        const { value, meter, isPlaying } = this.state;
        return { value: isPlaying && !this.memory.input && meter ? meter : value };
    }

    onInit() {
        this.options.track
            .getVolume()
            .addValueObserver((value: number) => this.setState({ value }));
        this.options.track.addVuMeterObserver(128, -1, false, meter => {
            if (this.state.isPlaying) this.setState({ meter: Math.min(meter / 127, 1) });
        });
        store.transport.isPlaying().addValueObserver((isPlaying: boolean) => {
            this.setState({ isPlaying });
        });
    }

    onInput({ value }) {
        if (!this.options.track.exists().get()) return this.control.render();

        if (Math.abs(this.state.value - value) < 0.1) this.memory.ready = true;
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.ready;
            delete this.memory.input;
        }, this.INPUT_DELAY);

        if (this.memory.ready || !this.state.isPlaying) this.options.track.getVolume().set(value);
    }
}
