import { Button } from 'taktil';

interface Options {
    index: number;
    trackBank: API.TrackBank;
}

export class VolumeKnobTouch extends Button<Options> {
    track = this.options.trackBank.getChannel(this.options.index);

    onDoublePress() {
        this.track.getVolume().reset();
    }
}
