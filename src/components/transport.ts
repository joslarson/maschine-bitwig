import { Button, Control, ControlState } from 'taktil';

export class PlayToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        this.state.on ? this.options.transport.stop() : this.options.transport.play();
    }
}

export class MetronomeToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport.isMetronomeEnabled().addValueObserver(isOn => {
            this.setState({ on: isOn });
        });
    }

    onPress() {
        this.options.transport.isMetronomeEnabled().set(!this.state.on);
    }
}

export class PreRollToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport.preRoll().addValueObserver(preRollState => {
            this.setState({ on: preRollState !== 'none' });
        });
    }

    onPress() {
        this.options.transport.preRoll().set(this.state.on ? 'none' : 'one_bar');
    }
}

export class RestartButton extends Button<
    { transport: API.Transport },
    { on: boolean; isPlaying: boolean }
> {
    onInit() {
        this.options.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ isPlaying }));
    }

    onPress() {
        this.setState({ on: true });
        this.options.transport.restart();
    }

    onRelease() {
        this.setState({ on: false });
    }
}

export class OverwriteToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport
            .isClipLauncherOverdubEnabled()
            .addValueObserver(isActive => this.setState({ on: isActive }));
    }

    onPress() {
        this.options.transport.isClipLauncherOverdubEnabled().set(!this.state.on);
    }
}

export class LoopToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport
            .isArrangerLoopEnabled()
            .addValueObserver(isActive => this.setState({ on: isActive }));
    }

    onPress() {
        this.options.transport.isArrangerLoopEnabled().set(!this.state.on);
    }
}

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
