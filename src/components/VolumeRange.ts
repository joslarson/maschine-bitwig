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
        const { minValue, maxValue, range } = this.control;
        this.options.track
            .getVolume()
            .addValueObserver((value: number) =>
                this.setState({ value: Math.round(value * range + minValue) })
            );
        this.options.track.addVuMeterObserver(range + 1, -1, false, meter => {
            if (this.state.isPlaying) this.setState({ meter: Math.min(meter / range, maxValue) });
        });
        store.transport.isPlaying().addValueObserver((isPlaying: boolean) => {
            this.setState({ isPlaying });
        });
    }

    onInput({ value }) {
        const { minValue, maxValue, range } = this.control;

        if (!this.options.track.exists().get()) return this.control.render();

        if (Math.abs(this.state.value - value) < 12) this.memory.ready = true;
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.ready;
            delete this.memory.input;
        }, this.INPUT_DELAY);

        if (this.memory.ready || !this.state.isPlaying) {
            this.options.track.getVolume().set((value - minValue) / range + minValue);
        }
    }
}
