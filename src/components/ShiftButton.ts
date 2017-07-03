import { Button } from 'taktil';

export default class ShiftButton extends Button {
    DOUBLE_PRESS_DELAY = 100;

    onPress() {
        this.setState({ on: true });
        session.activateMode('SHIFT');
    }

    onRelease() {
        this.setState({ on: false });
        session.deactivateMode('SHIFT');
    }

    onDoublePress() {
        session.rerender();
    }
}
