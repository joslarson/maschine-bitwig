import taktil from 'taktil';

interface Params {
    mode: string;
    pinnable?: boolean;
}

export class ModeButton extends taktil.Button<Params> {
    DOUBLE_PRESS_DELAY = 100;

    onPress() {
        if (this.params.pinnable && taktil.modeIsActive('SHIFT')) {
            const on = !this.state.on;
            this.setState({ on });
            if (on) {
                taktil.activateMode(this.params.mode);
            } else {
                taktil.deactivateMode(this.params.mode);
            }
            taktil.activateMode(this.params.mode);
        } else {
            this.setState({ on: true });
            taktil.activateMode(this.params.mode);
        }
    }

    onRelease() {
        if (!taktil.modeIsActive('SHIFT') || !this.params.pinnable) {
            this.setState({ on: false });
            taktil.deactivateMode(this.params.mode);
        }
    }

    onDoublePress() {
        taktil.resetControls();
    }
}
