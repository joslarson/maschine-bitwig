import { Button } from 'taktil';

interface Params {
    mode: string;
    pinnable?: boolean;
}

export class ModeButton extends Button<Params> {
    DOUBLE_PRESS_DELAY = 100;

    onPress() {
        if (this.params.pinnable && session.modeIsActive('SHIFT')) {
            const on = !this.state.on;
            this.setState({ on });
            if (on) {
                session.activateMode(this.params.mode);
            } else {
                session.deactivateMode(this.params.mode);
            }
            session.activateMode(this.params.mode);
        } else {
            this.setState({ on: true });
            session.activateMode(this.params.mode);
        }
    }

    onRelease() {
        if (!session.modeIsActive('SHIFT') || !this.params.pinnable) {
            this.setState({ on: false });
            session.deactivateMode(this.params.mode);
        }
    }

    onDoublePress() {
        session.resetControls();
    }
}
