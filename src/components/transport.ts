import { Button, Control, ControlState } from 'taktil';

export class ArmToggle extends Button<{ track: API.Track }> {
    onInit() {
        this.props.track.getArm().addValueObserver(isArmed => {
            this.setState({ ...this.state, on: isArmed });
        });
    }

    onPress() {
        this.props.track.getArm().set(!this.props.track.getArm().get());
    }
}

export class TempoButton extends Button<{ transport: API.Transport }> {
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

export class TempoRing extends Button<{ transport: API.Transport }> {
    onInit() {
        session.on('activateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: true });
        });
        session.on('deactivateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: false });
        });
    }

    onInput(control: Control, { value }: ControlState) {
        console.log(value * 63);
        const shift = session.modeIsActive('SHIFT');
        this.props.transport.tempo().inc(value * 63 * (1 / (666 - 20)) * (shift ? 1 / 10 : 1));
    }
}
