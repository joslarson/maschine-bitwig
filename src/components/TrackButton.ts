import { Button, SimpleControl, Color } from 'taktil';

interface Options {
    application: API.Application;
    trackBank: API.TrackBank;
    transport: API.Transport;
    index: number;
}

interface State {
    on: boolean;
    color?: Color;
    exists: boolean;
    disabled: boolean;
    noteOn: boolean;
}

export class TrackButton extends Button<Options, State> {
    state: State = { on: false, disabled: false, exists: false, noteOn: false };
    notes: API.PlayingNote[] = [];
    track: API.Track;

    getOutput() {
        const { on, exists, color, noteOn } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            accent: noteOn,
            ...color === undefined ? {} : { color },
        };
    }

    onInit() {
        this.track = this.options.trackBank.getChannel(this.options.index) as API.Track;
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
            const delay = 60000 / (this.options.transport.tempo().get() * (666 - 20) + 20) / 8;
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
        if (this.options.index === this.options.trackBank.channelCount().get()) {
            this.options.application.createInstrumentTrack(this.options.index);
            this.track.browseToInsertAtStartOfChain();
        }
        this.track.selectInEditor();
    }

    onLongPress() {
        if (this.track.isGroup().get() && !this.state.disabled) {
            this.options.application.navigateIntoTrackGroup(this.track);
            this.options.trackBank.getChannel(0).selectInEditor();
        }
    }

    onDoublePress() {
        if (!this.state.disabled) {
            this.options.application.navigateToParentTrackGroup();
            this.options.trackBank.getChannel(0).selectInEditor();
        }
    }
}
