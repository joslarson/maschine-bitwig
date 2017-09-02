import taktil from 'taktil';

interface Params {
    trackBank: API.TrackBank;
    index: number;
}
type State = { on: boolean; color?: taktil.Color; exists: boolean };

export class TrackBankNavigationButton extends taktil.Button<Params, State> {
    state: State = { on: false, exists: false };

    getControlOutput() {
        const { on, exists, color } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            ...color === undefined ? {} : { color },
        };
    }

    onInit() {
        this.params.trackBank.channelCount().addValueObserver(channelCount => {
            const navBankCount = Math.round(channelCount / 8);
            this.setState({ exists: this.params.index < navBankCount });
        });
        this.params.trackBank.channelScrollPosition().addValueObserver(position => {
            const channelCount = this.params.trackBank.channelCount().get();
            const lastStart = channelCount - 8;
            const isLastGroup = this.params.index * 8 >= lastStart;
            const target = this.params.index * 8;
            this.setState({ on: position === target || (isLastGroup && position === lastStart) });
        });
    }

    onPress() {
        if (this.state.exists && !this.state.on) {
            // this.params.trackBank.channelScrollPosition().set(this.params.index * 8);
            this.params.trackBank.getChannel(0).selectInEditor();
        }
    }
}
