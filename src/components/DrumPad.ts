import { NoteInputProxy } from 'NoteInput';
import taktil from 'taktil';

interface Params {
    transport: API.Transport;
    cursorTrack: API.CursorTrack;
    drumPadBank: API.DrumPadBank;
    noteInput: NoteInputProxy;
    index: number;
}

interface State {
    on: boolean;
    mute: boolean;
    solo: boolean;
    selected: boolean;
    color?: taktil.Color;
    exists: boolean;
    disabled: boolean;
    noteOn: boolean;
    tempo: number;
    trackColor: taktil.Color;
    bankExists: boolean;
}

export class DrumPad extends taktil.Button<Params, State> {
    state: State = {
        tempo: 120,
        on: false,
        mute: false,
        solo: false,
        selected: false,
        disabled: false,
        exists: false,
        noteOn: false,
        trackColor: { r: 1, g: 1, b: 1 },
        bankExists: false,
    };
    drumPad: API.DrumPad;

    getControlOutput() {
        const { mute, solo, selected, exists, color, noteOn, bankExists } = this.state;
        let value = noteOn ? 1 : 0;
        let accent = false;

        if (taktil.modeIsActive('MUTE') && bankExists) value = mute ? 1 : 0;
        else if (taktil.modeIsActive('SOLO') && bankExists) value = solo ? 1 : 0;
        else if (taktil.modeIsActive('SELECT') && bankExists) value = selected ? 1 : 0;
        else if (!bankExists) {
            const note = this.params.noteInput.keyTranslationTable[this.params.index + 36];
            accent = note % 12 === 0;
        }
        return {
            accent,
            value: value,
            disabled: bankExists ? !exists : false,
            color: bankExists ? color || this.state.trackColor : this.state.trackColor,
        };
    }

    onInit() {
        this.params.drumPadBank.exists().addValueObserver(exists => {
            this.setState({ bankExists: exists });
        });
        this.params.cursorTrack.color().addValueObserver((r, g, b) => {
            this.setState({ trackColor: { r, g, b } });
        });
        this.params.transport.tempo().addRawValueObserver(value => {
            this.setState({ tempo: value });
        });
        this.drumPad = this.params.drumPadBank.getItemAt(this.params.index) as API.DrumPad;

        this.drumPad.color().addValueObserver((r, g, b) => {
            this.setState({ ...this.state, color: { r, g, b } });
        });

        this.drumPad.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ ...this.state, selected: isSelected });
        });

        this.drumPad.getMute().addValueObserver(isMuted => {
            this.setState({ ...this.state, mute: isMuted });
        });

        this.drumPad.getSolo().addValueObserver(isSoloed => {
            this.setState({ ...this.state, solo: isSoloed });
        });

        this.drumPad.exists().addValueObserver(trackExists => {
            this.setState({ ...this.state, exists: trackExists });
        });
        this.params.cursorTrack.playingNotes().addValueObserver((notes: API.PlayingNote[]) => {
            let note: API.PlayingNote | undefined;
            for (let n of Array.prototype.slice.call(notes)) {
                const pitch = n.pitch();
                if (pitch === this.params.noteInput.keyTranslationTable[this.params.index + 36]) {
                    note = n;
                    break;
                }
            }
            this.setState({ noteOn: note !== undefined });
        });

        taktil.on(
            'activateMode',
            mode => (mode === 'SELECT' || mode === 'MUTE' || mode === 'SOLO') && this.setState({})
        );

        taktil.on(
            'deactivateMode',
            mode => (mode === 'SELECT' || mode === 'MUTE' || mode === 'SOLO') && this.setState({})
        );
        this.params.noteInput.onChange(() => this.setState({}));
    }

    onPress() {
        if (taktil.modeIsActive('MUTE')) {
            if (!this.state.mute) this.drumPad.getSolo().set(false);
            this.drumPad.getMute().toggle();
            return;
        }

        if (taktil.modeIsActive('SOLO')) {
            if (!this.state.solo) this.drumPad.getMute().set(false);
            this.drumPad.getSolo().toggle();
            return;
        }

        if (!this.drumPad.exists()) this.drumPad.browseToInsertAtStartOfChain();
        if (taktil.modeIsActive('SELECT')) this.drumPad.select();
    }
}
