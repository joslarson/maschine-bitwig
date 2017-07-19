import { Button, SimpleControl, Color } from 'taktil';

import store from '../store';

type Props = { index: number };
type State = { on: boolean; color?: Color; exists: boolean };

export default class TrackBankNavigationButton extends Button<Props, State> {
    state: State = { on: false, exists: false };

    getOutput(control: SimpleControl) {
        const { on, exists, color } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            ...color === undefined ? {} : { color },
        };
    }

    onInit() {
        store.trackBank.channelCount().addValueObserver(channelCount => {
            const navBankCount = Math.round(channelCount / 8);
            this.setState({ exists: this.props.index < navBankCount });
        });
        store.trackBank.channelScrollPosition().addValueObserver(position => {
            const channelCount = store.trackBank.channelCount().get();
            const lastStart = channelCount - 8;
            const isLastGroup = this.props.index * 8 >= lastStart;
            const target = this.props.index * 8;
            this.setState({ on: position === target || (isLastGroup && position === lastStart) });
        });
    }

    onPress() {
        if (this.state.exists && !this.state.on) {
            // store.trackBank.channelScrollPosition().set(this.props.index * 8);
            store.trackBank.getChannel(0).selectInEditor();
        }
    }
}
