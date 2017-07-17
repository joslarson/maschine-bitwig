import { View } from 'taktil';

import {
    ModeGate,
    ViewToggle,
    RestartButton,
    LoopToggle,
    MetronomeToggle,
    PlayToggle,
    PreRollToggle,
} from 'taktil/contrib/components';

import controls from '../controls';
import * as components from '../components';
import store from '../store';

export default class BaseView extends View {
    // Top Left
    arrangeLayoutButton = new components.LayoutButton(controls.ARRANGE, { layout: 'ARRANGE' });
    mixLayoutButton = new components.LayoutButton(controls.MIX, { layout: 'MIX' });
    editLayoutButton = new components.LayoutButton(controls.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new components.BrowserToggle(controls.BROWSE);

    // Performance
    tempoButton = new components.TempoButton(controls.TAP, { transport: store.transport });

    // Groups
    trackButtons = [
        controls.GROUP_A,
        controls.GROUP_B,
        controls.GROUP_C,
        controls.GROUP_D,
        controls.GROUP_E,
        controls.GROUP_F,
        controls.GROUP_G,
        controls.GROUP_H,
    ].map((control, index) => new components.TrackButton(control, { index }));

    trackNavButtons = [
        controls.GROUP_A,
        controls.GROUP_B,
        controls.GROUP_C,
        controls.GROUP_D,
        controls.GROUP_E,
        controls.GROUP_F,
        controls.GROUP_G,
        controls.GROUP_H,
    ].map(
        (control, index) => new components.TrackBankNavigationButton(control, 'SHIFT', { index }),
    );

    volumeKnobs = [
        controls.VOL_A,
        controls.VOL_B,
        controls.VOL_C,
        controls.VOL_D,
        controls.VOL_E,
        controls.VOL_F,
        controls.VOL_G,
        controls.VOL_H,
    ].map(
        (control, index) =>
            new components.VolumeRange(control, {
                track: store.trackBank.getChannel(index) as API.Track,
            }),
    );

    volumeKnobsTouch = [
        controls.VOL_TOUCH_A,
        controls.VOL_TOUCH_B,
        controls.VOL_TOUCH_C,
        controls.VOL_TOUCH_D,
        controls.VOL_TOUCH_E,
        controls.VOL_TOUCH_F,
        controls.VOL_TOUCH_G,
        controls.VOL_TOUCH_H,
    ].map((control, index) => new components.VolumeKnobTouch(control, { index }));

    masterVolume = new components.VolumeRange(controls.KNOB, { track: store.masterTrack });

    // Transport
    restartButton = new RestartButton(controls.RESTART, { transport: store.transport });
    loopToggle = new LoopToggle(controls.RESTART, 'SHIFT', { transport: store.transport });
    metronomeToggle = new MetronomeToggle(controls.METRO, { transport: store.transport });
    shiftButton = new components.ShiftButton(controls.GRID);
    playToggle = new PlayToggle(controls.PLAY, { transport: store.transport });
    armToggle = new components.ArmToggle(controls.REC, { track: store.cursorTrack });
    preRollToggle = new PreRollToggle(controls.REC, 'SHIFT', { transport: store.transport });

    // Pads
    sceneViewButton = new ViewToggle(controls.SCENE, { view: 'SceneView' });
    patternViewButton = new ViewToggle(controls.PATTERN, { view: 'PatternView' });
    padMidiViewButton = new ViewToggle(controls.PAD_MODE, { view: 'PadMidiView' });
    navigateViewButton = new ViewToggle(controls.NAVIGATE, { view: 'NavigateView' });
    duplicateModeGate = new ModeGate(controls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new ModeGate(controls.SELECT, { mode: 'SELECT' });
    soloModeGate = new ModeGate(controls.SOLO, { mode: 'SOLO' });
    muteModeGate = new ModeGate(controls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new components.ActionButton(controls.UNDO, { action: 'undo' });
    redoButton = new components.ActionButton(controls.REDO, { action: 'redo' });
    copyButton = new components.ActionButton(controls.COPY, { action: 'copy' });
    pasteButton = new components.ActionButton(controls.PASTE, { action: 'paste' });
    deleteButton = new components.ActionButton(controls.CLEAR, { action: 'delete' });
    toggleBrowserRing = new components.BrowserToggle(controls.JOG_RING);
    tempoRing = new components.TempoRing(controls.JOG_RING, 'TEMPO');
    browserExitButton = new components.BrowserExitButton(controls.BACK);
}
