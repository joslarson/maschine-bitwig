import taktil from 'taktil';
import { getNextColor } from 'utils';

interface Params {
    application: API.Application;
    cursorTrack: API.CursorTrack;
    trackBank: API.TrackBank;
    transport: API.Transport;
    index: number;
}

interface State {
    on: boolean;
    mute: boolean;
    solo: boolean;
    color?: taktil.Color;
    exists: boolean;
    disabled: boolean;
    noteOn: boolean;
    tempo: number;
}

export class TrackButton extends taktil.Button<Params, State> {
    state: State = {
        tempo: 120,
        on: false,
        mute: false,
        solo: false,
        disabled: false,
        exists: false,
        noteOn: false,
    };
    notes: API.PlayingNote[] = [];
    track: API.Track;

    getControlOutput() {
        const { on, mute, solo, exists, color, noteOn } = this.state;

        let value = on ? 1 : 0;
        if (taktil.modeIsActive('MUTE')) value = mute ? 1 : 0;
        if (taktil.modeIsActive('SOLO')) value = solo ? 1 : 0;

        return {
            value: value,
            disabled: !exists,
            accent: noteOn,
            ...(color === undefined ? {} : { color }),
        };
    }

    onInit() {
        this.params.transport.tempo().addRawValueObserver(value => {
            this.setState({ tempo: value });
        });
        this.track = this.params.trackBank.getItemAt(this.params.index) as API.Track;
        this.track.isGroup().markInterested();

        this.track.color().addValueObserver((r, g, b) => {
            this.setState({ ...this.state, color: { r, g, b } });
        });

        this.track.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ ...this.state, on: isSelected });
        });

        this.track.getMute().addValueObserver(isMuted => {
            this.setState({ ...this.state, mute: isMuted });
        });

        this.track.getSolo().addValueObserver(isSoloed => {
            this.setState({ ...this.state, solo: isSoloed });
        });

        this.track.exists().addValueObserver(trackExists => {
            this.setState({ ...this.state, exists: trackExists });
        });
        this.track.playingNotes().addValueObserver((notes: API.PlayingNote[]) => {
            notes = Array.prototype.slice.call(notes);
            let noteOn = false;
            for (let note of notes) {
                if (this.notes.indexOf(note) === -1) {
                    noteOn = true;
                    break;
                }
            }
            this.notes = notes;
            const delay = 60000 / this.state.tempo / 4;
            if (noteOn) {
                if (this.memory.noteOn) {
                    clearTimeout(this.memory.noteOn);
                } else {
                    this.setState({ noteOn: true });
                }
                this.memory.noteOn = setTimeout(() => {
                    delete this.memory.noteOn;
                    this.setState({ noteOn: false });
                }, Math.max(delay, 40));
            }
        });

        taktil.on(
            'activateMode',
            mode => (mode === 'MUTE' || mode === 'SOLO') && this.setState({})
        );

        taktil.on(
            'deactivateMode',
            mode => (mode === 'MUTE' || mode === 'SOLO') && this.setState({})
        );
    }

    onPress() {
        if (taktil.modeIsActive('MUTE')) {
            this.track.getMute().toggle();
            return;
        }

        if (taktil.modeIsActive('SOLO')) {
            this.track.getSolo().toggle();
            return;
        }
        const channelCount = this.params.trackBank.channelCount().get();
        const scrollPosition = this.params.trackBank.scrollPosition().get();
        if (this.params.index === channelCount - scrollPosition) {
            this.params.cursorTrack.selectLast();
            this.params.application.getAction('Create Instrument Track').invoke();
            this.track.browseToInsertAtStartOfChain();
            this.params.cursorTrack.selectLast();
        } else {
            this.params.trackBank.getItemAt(this.params.index).select();
        }
    }

    onLongPress() {
        if (taktil.modeIsActive('MUTE') || taktil.modeIsActive('SOLO')) {
            return;
        }
        if (this.track.isGroup().get() && !this.state.disabled) {
            this.params.application.navigateIntoTrackGroup(this.track);
            this.params.trackBank.getChannel(0).selectInEditor();
        }
    }

    onDoublePress() {
        if (taktil.modeIsActive('MUTE') || taktil.modeIsActive('SOLO')) {
            return this.onPress();
        }
        if (!this.state.disabled) {
            this.params.cursorTrack.selectParent();
            this.params.application.navigateToParentTrackGroup();
        }
    }
}
