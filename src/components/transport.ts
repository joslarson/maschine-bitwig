import { Button, Control, ControlState } from 'taktil';

export class ArmToggle extends Button<{ track: API.Track }> {
    onInit() {
        this.options.track.getArm().addValueObserver(isArmed => {
            this.setState({ ...this.state, on: isArmed });
        });
    }

    onPress() {
        this.options.track.getArm().set(!this.options.track.getArm().get());
    }
}

export class TempoButton extends Button<{ transport: API.Transport }> {
    onPress() {
        this.setState({ ...this.state, on: true });
        this.options.transport.tapTempo();
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

    onInput({ value }: ControlState) {
        const shift = session.modeIsActive('SHIFT');
        this.options.transport.tempo().inc(value * (shift ? 1 / 10 : 1), 666 - 19);
    }
}
