import { session, AbstractButton } from 'taktil';
import * as components from 'taktil/contrib/components';

import store from 'store';


export class ArmToggle extends AbstractButton<{ track: API.Track }> {
    onInit() {
        this.props.track.getArm().addValueObserver(isArmed => {
            this.setState({ ...this.state, on: isArmed });
        });
    }

    onPress() {
        this.props.track.getArm().set(!this.props.track.getArm().get());
    }
}

export class TempoButton extends AbstractButton<{ transport: API.Transport }> {
    onPress() {
        this.setState({ ...this.state, on: true });
        this.props.transport.tapTempo();
        session.activateMode('TEMPO');
    }

    onRelease() {
        session.deactivateMode('TEMPO');
        this.setState({ ...this.state, on: false });
    }
}

export class TempoRing extends AbstractButton {
    onInit() {
        session.on('activateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: true });
        });
        session.on('deactivateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: false });
        });
    }
}