import taktil from 'taktil';

export interface VolumeRangeParams {
    track: API.Track;
    transport: API.Transport;
    meter?: boolean;
}

export interface VolumeRangeState {
    value: number;
    meter: number;
    isPlaying: boolean;
}

export class VolumeRange extends taktil.Range<VolumeRangeParams, VolumeRangeState> {
    state: VolumeRangeState = { value: 0, meter: 0, isPlaying: false };

    onInit() {
        const { minValue, maxValue, valueRange } = this.control;
        this.params.track
            .getVolume()
            .addValueObserver((value: number) =>
                this.setState({ value: Math.round(value * valueRange + minValue) })
            );

        if (this.params.meter) {
            this.params.track.addVuMeterObserver(valueRange, -1, false, meter => {
                if (this.state.isPlaying) this.setState({ meter: Math.min(meter, maxValue) });
            });
        }

        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ isPlaying }));
    }

    getControlOutput() {
        const { value, meter, isPlaying } = this.state;
        return { value: isPlaying && !this.memory.input && meter ? meter : value };
        // return { value: isPlaying && !this.memory.input && meter ? meter : value };
    }

    onControlInput({ value }: taktil.ControlState) {
        const { minValue, maxValue, valueRange } = this.control;

        if (!this.params.track.exists().get()) return this.control.render();

        if (Math.abs(this.state.value - value) < 12) this.memory.ready = true;
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.ready;
            delete this.memory.input;
        }, this.INPUT_DELAY);

        if (this.memory.ready || !this.state.isPlaying) {
            this.params.track.getVolume().set((value - minValue) / valueRange + minValue);
        }
    }
}
