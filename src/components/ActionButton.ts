import taktil from 'taktil';

export class ActionButton extends taktil.Button<{ application: API.Application; action: string }> {
    onPress() {
        this.setState({ on: true });
        this.params.application[this.params.action]();
    }

    onRelease() {
        this.setState({ on: false });
    }
}
