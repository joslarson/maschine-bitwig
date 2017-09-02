import taktil from 'taktil';

interface Params {
    application: API.Application;
    trackBank: API.TrackBank;
    transport: API.Transport;
    index: number;
}

interface State {
    on: boolean;
    color?: taktil.Color;
    exists: boolean;
    disabled: boolean;
    noteOn: boolean;
    tempo: number;
}

export class TrackButton extends taktil.Button<Params, State> {
    state: State = { tempo: 120, on: false, disabled: false, exists: false, noteOn: false };
    notes: API.PlayingNote[] = [];
    track: API.Track;

    getControlOutput() {
        const { on, exists, color, noteOn } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            accent: noteOn,
            ...color === undefined ? {} : { color },
        };
    }

    onInit() {
        this.params.transport.tempo().addRawValueObserver(value => {
            this.setState({ tempo: value });
        });
        this.track = this.params.trackBank.getChannel(this.params.index) as API.Track;
        this.track.isGroup().markInterested();

        this.track.color().addValueObserver((r, g, b) => {
            this.setState({ ...this.state, color: { r, g, b } });
        });

        this.track.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ ...this.state, on: isSelected });
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
    }

    onPress() {
        if (this.params.index === this.params.trackBank.channelCount().get()) {
            this.params.application.createInstrumentTrack(this.params.index);
            this.track.browseToInsertAtStartOfChain();
        }
        this.track.selectInEditor();
    }

    onLongPress() {
        if (this.track.isGroup().get() && !this.state.disabled) {
            this.params.application.navigateIntoTrackGroup(this.track);
            this.params.trackBank.getChannel(0).selectInEditor();
        }
    }

    onDoublePress() {
        if (!this.state.disabled) {
            this.params.application.navigateToParentTrackGroup();
            this.params.trackBank.getChannel(0).selectInEditor();
        }
    }
}
