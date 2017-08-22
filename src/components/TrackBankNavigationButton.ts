import { Button, SimpleControl, Color } from 'taktil';

interface Options {
    trackBank: API.TrackBank;
    index: number;
}
type State = { on: boolean; color?: Color; exists: boolean };

export class TrackBankNavigationButton extends Button<Options, State> {
    state: State = { on: false, exists: false };

    getOutput() {
        const { on, exists, color } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            ...color === undefined ? {} : { color },
        };
    }

    onInit() {
        this.options.trackBank.channelCount().addValueObserver(channelCount => {
            const navBankCount = Math.round(channelCount / 8);
            this.setState({ exists: this.options.index < navBankCount });
        });
        this.options.trackBank.channelScrollPosition().addValueObserver(position => {
            const channelCount = this.options.trackBank.channelCount().get();
            const lastStart = channelCount - 8;
            const isLastGroup = this.options.index * 8 >= lastStart;
            const target = this.options.index * 8;
            this.setState({ on: position === target || (isLastGroup && position === lastStart) });
        });
    }

    onPress() {
        if (this.state.exists && !this.state.on) {
            // this.options.trackBank.channelScrollPosition().set(this.options.index * 8);
            this.options.trackBank.getChannel(0).selectInEditor();
        }
    }
}
