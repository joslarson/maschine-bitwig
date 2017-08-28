import taktil from 'taktil';

interface Params {
    index: number;
    trackBank: API.TrackBank;
}

export class VolumeKnobTouch extends taktil.Button<Params> {
    track = this.params.trackBank.getChannel(this.params.index);

    onDoublePress() {
        this.track.getVolume().reset();
    }
}
