import { Button } from 'taktil';

import store from 'store';

export default class ActionButton extends Button<{ action: string }> {
    onPress() {
        this.setState({ on: true });
        store.application[this.props.action]();
    }

    onRelease() {
        this.setState({ on: false });
    }
}
