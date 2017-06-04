import { Button } from 'taktil';
import store from '../store';


export default class VolumeKnobTouch extends Button<{ index: number }> {
    track = store.trackBank.getChannel(this.props.index);

    onDoublePress() {
        this.track.getVolume().reset();
    }
}