import { Button, SimpleControl, Color } from 'taktil';

import store from '../store';

type Props = {
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

export default class ClipSlotButton extends Button<Props, State> {
    state: State = {
        on: false,
        color: undefined,
        isPlaying: false,
        isPlaybackQueued: false,
        isRecording: false,
        isRecordingQueued: false,
        hasContent: false,
    };
    clipLauncherSlotBank = store.cursorTrack.clipLauncherSlotBank();

    getOutput(control: SimpleControl) {
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

        if (this.props.binary) {
            value = hasContent || isRecordingQueued ? 1 : 0;
            disabled = false;
            flashing = isPlaybackQueued || isRecordingQueued || isPlaying || isRecording;
        }

        return { value, ...color === undefined ? {} : { color }, disabled, flashing };
    }

    onInit() {
        store.sceneBank.getScene(this.props.index).exists().markInterested();

        this.clipLauncherSlotBank.addIsPlayingObserver((index, isPlaying) => {
            if (index === this.props.index) this.setState({ isPlaying });
        });
        this.clipLauncherSlotBank.addIsPlaybackQueuedObserver((index, isPlaybackQueued) => {
            if (index === this.props.index) this.setState({ isPlaybackQueued });
        });
        this.clipLauncherSlotBank.addIsRecordingObserver((index, isRecording) => {
            if (index === this.props.index) this.setState({ isRecording });
        });
        this.clipLauncherSlotBank.addIsRecordingQueuedObserver((index, isRecordingQueued) => {
            if (index === this.props.index) this.setState({ isRecordingQueued });
        });
        this.clipLauncherSlotBank.addColorObserver((index, r, g, b) => {
            if (index === this.props.index) this.setState({ color: { r, g, b } });
        });
        this.clipLauncherSlotBank.addHasContentObserver((index, hasContent) => {
            if (index === this.props.index) this.setState({ hasContent });
        });
    }

    onPress() {
        const sceneExists = store.sceneBank.getScene(this.props.index).exists().get();
        if (!sceneExists) {
            for (let i = 0; i <= this.props.index; i++) {
                if (!store.sceneBank.getScene(i).exists().get()) {
                    store.createScene.invoke();
                }
            }
        }
        this.clipLauncherSlotBank.launch(this.props.index);
    }
}
