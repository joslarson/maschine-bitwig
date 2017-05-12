import { AbstractButton } from 'taktil';
import store from '../store';


export default class VolumeKnobTouch extends AbstractButton<{ index: number }> {
    track = store.trackBank.getChannel(this.props.index);

    onDoublePress() {
        this.track.getVolume().reset();
    }
}