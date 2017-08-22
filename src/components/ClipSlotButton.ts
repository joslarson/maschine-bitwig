import { Button, SimpleControl, Color } from 'taktil';

type Options = {
    application: API.Application;
    cursorTrack: API.CursorTrack;
    sceneBank: API.SceneBank;
    index: number;
    binary?: boolean;
};

interface State {
    on: boolean;
    color: Color | undefined;
    isPlaying: boolean;
    isPlaybackQueued: boolean;
    isRecording: boolean;
    isRecordingQueued: boolean;
    hasContent: boolean;
}

export class ClipSlotButton extends Button<Options, State> {
    state: State = {
        on: false,
        color: undefined,
        isPlaying: false,
        isPlaybackQueued: false,
        isRecording: false,
        isRecordingQueued: false,
        hasContent: false,
    };
    clipLauncherSlotBank = this.options.cursorTrack.clipLauncherSlotBank();

    getOutput() {
        const {
            isPlaying,
            isPlaybackQueued,
            isRecording,
            isRecordingQueued,
            hasContent,
        } = this.state;

        let value = isPlaying || isPlaybackQueued || isRecording || isRecordingQueued ? 1 : 0;
        let disabled = !hasContent && !isRecordingQueued;
        let flashing = isPlaybackQueued || isRecordingQueued;
        let color = isRecordingQueued || isRecording ? { r: 1, g: 0, b: 0 } : this.state.color;

        if (this.options.binary) {
            value = hasContent || isRecordingQueued ? 1 : 0;
            disabled = false;
            flashing = isPlaybackQueued || isRecordingQueued || isPlaying || isRecording;
        }

        return { value, ...color === undefined ? {} : { color }, disabled, flashing };
    }

    onInit() {
        this.options.sceneBank.getScene(this.options.index).exists().markInterested();

        this.clipLauncherSlotBank.addIsPlayingObserver((index, isPlaying) => {
            if (index === this.options.index) this.setState({ isPlaying });
        });
        this.clipLauncherSlotBank.addIsPlaybackQueuedObserver((index, isPlaybackQueued) => {
            if (index === this.options.index) this.setState({ isPlaybackQueued });
        });
        this.clipLauncherSlotBank.addIsRecordingObserver((index, isRecording) => {
            if (index === this.options.index) this.setState({ isRecording });
        });
        this.clipLauncherSlotBank.addIsRecordingQueuedObserver((index, isRecordingQueued) => {
            if (index === this.options.index) this.setState({ isRecordingQueued });
        });
        this.clipLauncherSlotBank.addColorObserver((index, r, g, b) => {
            if (index === this.options.index) this.setState({ color: { r, g, b } });
        });
        this.clipLauncherSlotBank.addHasContentObserver((index, hasContent) => {
            if (index === this.options.index) this.setState({ hasContent });
        });
    }

    onPress() {
        const sceneExists = this.options.sceneBank.getScene(this.options.index).exists().get();
        if (!sceneExists) {
            for (let i = 0; i <= this.options.index; i++) {
                if (!this.options.sceneBank.getScene(i).exists().get()) {
                    this.options.application.getAction('Create Scene').invoke();
                }
            }
        }
        this.clipLauncherSlotBank.launch(this.options.index);
    }
}
