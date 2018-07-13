import { NoteInputProxy } from 'NoteInput';
import taktil from 'taktil';

interface Params {
    noteInput: NoteInputProxy;
    drumPadBank: API.DrumPadBank;
    direction: 'UP' | 'DOWN';
}

interface State extends taktil.ButtonState {
    drumBankActive: boolean;
}

export class Transpose extends taktil.Button<Params, State> {
    state = { on: false, drumBankActive: true };

    onInit() {
        this.params.drumPadBank.exists().addValueObserver(exists => {
            this.setState({ drumBankActive: exists });
        });
    }

    onPress() {
        this.setState({ on: true });
        const { noteInput, drumPadBank, direction } = this.params;
        const { drumBankActive } = this.state;

        const small = drumBankActive ? 4 : 1;
        const large = drumBankActive ? 16 : 12;

        let steps = taktil.modeIsActive('SHIFT') ? 1 : 12;
        steps = direction === 'UP' ? steps : steps * -1;
        const dest = drumPadBank.scrollPosition().get() + steps;
        if (dest >= 0 && dest <= 116) {
            noteInput.transpose(steps);
            drumPadBank.scrollBy(steps);
        }
    }

    onRelease() {
        this.setState({ on: false });
    }
}
