import { Button } from 'taktil';

interface Options {
    mode: string;
    pinnable?: boolean;
}

export class ModeButton extends Button<Options> {
    DOUBLE_PRESS_DELAY = 100;

    onPress() {
        if (this.options.pinnable && session.modeIsActive('SHIFT')) {
            const on = !this.state.on;
            this.setState({ on });
            if (on) {
                session.activateMode(this.options.mode);
            } else {
                session.deactivateMode(this.options.mode);
            }
            session.activateMode(this.options.mode);
        } else {
            this.setState({ on: true });
            session.activateMode(this.options.mode);
        }
    }

    onRelease() {
        if (!session.modeIsActive('SHIFT') || !this.options.pinnable) {
            this.setState({ on: false });
            session.deactivateMode(this.options.mode);
        }
    }

    onDoublePress() {
        session.resetControls();
    }
}
