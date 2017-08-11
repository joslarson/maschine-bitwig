import { Button } from 'taktil';

interface Props {
    mode: string;
    pinnable?: boolean;
}

export default class ModeButton extends Button<Props> {
    DOUBLE_PRESS_DELAY = 100;

    onPress() {
        if (this.props.pinnable && session.modeIsActive('SHIFT')) {
            const on = !this.state.on;
            this.setState({ on });
            if (on) {
                session.activateMode(this.props.mode);
            } else {
                session.deactivateMode(this.props.mode);
            }
            session.activateMode(this.props.mode);
        } else {
            this.setState({ on: true });
            session.activateMode(this.props.mode);
        }
    }

    onRelease() {
        if (!session.modeIsActive('SHIFT') || !this.props.pinnable) {
            this.setState({ on: false });
            session.deactivateMode(this.props.mode);
        }
    }

    onDoublePress() {
        session.resetControls();
    }
}
