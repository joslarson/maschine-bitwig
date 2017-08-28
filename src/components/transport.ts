import taktil from 'taktil';

export class PlayToggle extends taktil.Button<{ transport: API.Transport }> {
    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        this.state.on ? this.params.transport.stop() : this.params.transport.play();
    }
}

export class MetronomeToggle extends taktil.Button<{ transport: API.Transport }> {
    onInit() {
        this.params.transport.isMetronomeEnabled().addValueObserver(isOn => {
            this.setState({ on: isOn });
        });
    }

    onPress() {
        this.params.transport.isMetronomeEnabled().toggle();
    }
}

export class PreRollToggle extends taktil.Button<{ transport: API.Transport }> {
    onInit() {
        this.params.transport.preRoll().addValueObserver(preRollState => {
            this.setState({ on: preRollState !== 'none' });
        });
    }

    onPress() {
        this.params.transport.preRoll().set(this.state.on ? 'none' : 'one_bar');
    }
}

export class RestartButton extends taktil.Button<
    { transport: API.Transport },
    { on: boolean; isPlaying: boolean }
> {
    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ isPlaying }));
    }

    onPress() {
        this.setState({ on: true });
        this.params.transport.restart();
    }

    onRelease() {
        this.setState({ on: false });
    }
}

export class OverwriteToggle extends taktil.Button<{ transport: API.Transport }> {
    onInit() {
        this.params.transport
            .isClipLauncherOverdubEnabled()
            .addValueObserver(isActive => this.setState({ on: isActive }));
    }

    onPress() {
        this.params.transport.isClipLauncherOverdubEnabled().set(!this.state.on);
    }
}

export class LoopToggle extends taktil.Button<{ transport: API.Transport }> {
    onInit() {
        this.params.transport
            .isArrangerLoopEnabled()
            .addValueObserver(isActive => this.setState({ on: isActive }));
    }

    onPress() {
        this.params.transport.isArrangerLoopEnabled().set(!this.state.on);
    }
}

export class ArmToggle extends taktil.Button<{ track: API.Track }> {
    onInit() {
        this.params.track.getArm().addValueObserver(isArmed => {
            this.setState({ ...this.state, on: isArmed });
        });
    }

    onPress() {
        this.params.track.getArm().set(!this.params.track.getArm().get());
    }
}

export class TempoButton extends taktil.Button<{ transport: API.Transport }> {
    onPress() {
        this.setState({ ...this.state, on: true });
        this.params.transport.tapTempo();
        taktil.activateMode('TEMPO');
    }

    onRelease() {
        taktil.deactivateMode('TEMPO');
        this.setState({ ...this.state, on: false });
    }
}

export class TempoRing extends taktil.Button<{ transport: API.Transport }> {
    onInit() {
        taktil.on('activateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: true });
        });
        taktil.on('deactivateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: false });
        });
    }

    onInput({ value }: taktil.ControlState) {
        const shift = taktil.modeIsActive('SHIFT');
        this.params.transport.tempo().inc(value * (shift ? 1 / 10 : 1), 666 - 19);
    }
}
