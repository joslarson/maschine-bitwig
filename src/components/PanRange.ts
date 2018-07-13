import taktil from 'taktil';

export class PanRange extends taktil.Range<{ track: API.Track }> {
    state: taktil.RangeState = { value: 128 / 2 - 1 };
    onInit() {
        const { minValue, valueRange } = this.control;
        this.params.track
            .getPan()
            .addValueObserver((value: number) =>
                this.setState({ value: Math.round(value * valueRange + minValue) })
            );
    }

    getControlOutput() {
        const { value } = this.state;
        return { value: this.params.track.exists().get() ? value : 128 / 2 - 1 };
    }

    onControlInput({ value }: taktil.ControlState) {
        const { minValue, valueRange } = this.control;

        if (!this.params.track.exists().get()) return this.control.render();

        if (Math.abs(this.state.value - value) < 12) this.memory.ready = true;
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.ready;
            delete this.memory.input;
        }, this.INPUT_DELAY);

        if (this.memory.ready) {
            this.params.track.getPan().set((value - minValue) / valueRange + minValue);
        }
    }
}
