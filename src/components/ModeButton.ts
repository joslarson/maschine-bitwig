import taktil from 'taktil';

interface Params {
    targetMode: string;
    pinnable?: boolean;
}

export class ModeButton extends taktil.Button<Params> {
    DOUBLE_PRESS_DELAY = 100;

    onPress() {
        if (this.params.pinnable && taktil.modeIsActive('SHIFT')) {
            const on = !this.state.on;
            this.setState({ on });
            if (on) {
                taktil.activateMode(this.params.targetMode);
            } else {
                taktil.deactivateMode(this.params.targetMode);
            }
            taktil.activateMode(this.params.targetMode);
        } else {
            this.setState({ on: true });
            taktil.activateMode(this.params.targetMode);
        }
    }

    onRelease() {
        if (!taktil.modeIsActive('SHIFT') || !this.params.pinnable) {
            this.setState({ on: false });
            taktil.deactivateMode(this.params.targetMode);
        }
    }

    onDoublePress() {
        taktil.resetControls();
    }
}
