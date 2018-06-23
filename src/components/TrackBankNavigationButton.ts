import taktil from 'taktil';

interface Params {
    trackBank: API.TrackBank;
    cursorTrack: API.CursorTrack;
    application: API.Application;
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
            ...(color === undefined ? {} : { color }),
        };
    }

    onInit() {
        this.params.trackBank.channelCount().addValueObserver(channelCount => {
            let navBankCount = Math.ceil(channelCount / 8);
            if (channelCount % 8 === 0) navBankCount += 1;
            this.setState({ exists: this.params.index < navBankCount });
        });
        this.params.trackBank.channelScrollPosition().addValueObserver(position => {
            const channelCount = this.params.trackBank.channelCount().get();
            const bankPageCount = Math.ceil(channelCount / 8);
            const lastStart = channelCount - 8;
            const isLastGroup = this.params.index === bankPageCount - 1;
            const target = this.params.index * 8;
            this.setState({ on: position === target || (isLastGroup && position === lastStart) });
        });
    }

    onPress() {
        const channelCount = this.params.trackBank.channelCount().get();
        if (channelCount % 8 === 0 && this.params.index === Math.ceil(channelCount / 8)) {
            this.params.cursorTrack.selectLast();
            this.params.application.getAction('Create Instrument Track').invoke();
            this.params.trackBank.scrollToChannel(channelCount);
            this.params.cursorTrack.selectLast();
        } else if (this.state.exists && !this.state.on) {
            this.params.trackBank.scrollPosition().set(this.params.index * 8);
            this.params.trackBank.getChannel(0).selectInEditor();
        }
    }
}
