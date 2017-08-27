import { Button } from 'taktil';

interface Params {
    index: number;
    trackBank: API.TrackBank;
}

export class VolumeKnobTouch extends Button<Params> {
    track = this.params.trackBank.getChannel(this.params.index);

    onDoublePress() {
        this.track.getVolume().reset();
    }
}
