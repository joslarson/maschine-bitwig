import { Button } from 'taktil';

export class ActionButton extends Button<{ application: API.Application; action: string }> {
    onPress() {
        this.setState({ on: true });
        this.params.application[this.params.action]();
    }

    onRelease() {
        this.setState({ on: false });
    }
}
