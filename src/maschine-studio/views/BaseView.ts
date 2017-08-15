import { View } from 'taktil';

import ctrls from '../controls';
import * as comps from '../../components';
import store from '../../store';

export default class BaseView extends View {
    // Top Left
    arrangeLayoutButton = new comps.LayoutButton(ctrls.ARRANGE, { layout: 'ARRANGE' });
    mixLayoutButton = new comps.LayoutButton(ctrls.MIX, { layout: 'MIX' });
    editLayoutButton = new comps.LayoutButton(ctrls.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new comps.BrowserToggle(ctrls.BROWSE, {});

    // Performance
    tempoButton = new comps.TempoButton(ctrls.TAP, { transport: store.transport });

    // Groups
    trackButtons = [
        ctrls.GROUP_A,
        ctrls.GROUP_B,
        ctrls.GROUP_C,
        ctrls.GROUP_D,
        ctrls.GROUP_E,
        ctrls.GROUP_F,
        ctrls.GROUP_G,
        ctrls.GROUP_H,
    ].map((control, index) => new comps.TrackButton(control, { index }));

    trackNavButtons = [
        ctrls.GROUP_A,
        ctrls.GROUP_B,
        ctrls.GROUP_C,
        ctrls.GROUP_D,
        ctrls.GROUP_E,
        ctrls.GROUP_F,
        ctrls.GROUP_G,
        ctrls.GROUP_H,
    ].map((control, index) => new comps.TrackBankNavigationButton(control, 'SHIFT', { index }));

    volumeKnobs = [
        ctrls.VOL_A,
        ctrls.VOL_B,
        ctrls.VOL_C,
        ctrls.VOL_D,
        ctrls.VOL_E,
        ctrls.VOL_F,
        ctrls.VOL_G,
        ctrls.VOL_H,
    ].map(
        (control, index) =>
            new comps.VolumeRange(control, {
                track: store.trackBank.getChannel(index) as API.Track,
            })
    );

    volumeKnobsTouch = [
        ctrls.VOL_TOUCH_A,
        ctrls.VOL_TOUCH_B,
        ctrls.VOL_TOUCH_C,
        ctrls.VOL_TOUCH_D,
        ctrls.VOL_TOUCH_E,
        ctrls.VOL_TOUCH_F,
        ctrls.VOL_TOUCH_G,
        ctrls.VOL_TOUCH_H,
    ].map((control, index) => new comps.VolumeKnobTouch(control, { index }));

    masterVolume = new comps.VolumeRange(ctrls.KNOB, { track: store.masterTrack });

    // Transport
    restartButton = new comps.RestartButton(ctrls.RESTART, { transport: store.transport });
    loopToggle = new comps.LoopToggle(ctrls.RESTART, 'SHIFT', { transport: store.transport });
    metronomeToggle = new comps.MetronomeToggle(ctrls.METRO, {
        transport: store.transport,
    });
    shiftButton = new comps.ModeButton(ctrls.GRID, { mode: 'SHIFT' });
    playToggle = new comps.PlayToggle(ctrls.PLAY, { transport: store.transport });
    armToggle = new comps.ArmToggle(ctrls.REC, { track: store.cursorTrack });
    preRollToggle = new comps.PreRollToggle(ctrls.REC, 'SHIFT', { transport: store.transport });

    // Pads
    sceneViewButton = new comps.ViewToggle(ctrls.SCENE, { view: 'SceneView' });
    patternViewButton = new comps.ViewToggle(ctrls.PATTERN, { view: 'PatternView' });
    padMidiViewButton = new comps.ViewToggle(ctrls.PAD_MODE, { view: 'PadMidiView' });
    navigateViewButton = new comps.ViewToggle(ctrls.NAVIGATE, { view: 'NavigateView' });
    duplicateModeGate = new comps.ModeGate(ctrls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new comps.ModeGate(ctrls.SELECT, { mode: 'SELECT' });
    soloModeGate = new comps.ModeGate(ctrls.SOLO, { mode: 'SOLO' });
    muteModeGate = new comps.ModeGate(ctrls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new comps.ActionButton(ctrls.UNDO, { action: 'undo' });
    redoButton = new comps.ActionButton(ctrls.REDO, { action: 'redo' });
    copyButton = new comps.ActionButton(ctrls.COPY, { action: 'copy' });
    pasteButton = new comps.ActionButton(ctrls.PASTE, { action: 'paste' });
    deleteButton = new comps.ActionButton(ctrls.CLEAR, { action: 'delete' });
    toggleBrowserRing = new comps.BrowserToggle(ctrls.JOG_RING, {});
    tempoDial = new comps.TempoRing(ctrls.JOG_DIAL, 'TEMPO', { transport: store.transport });
    tempoRing = new comps.TempoRing(ctrls.JOG_RING, 'TEMPO', { transport: store.transport });
    browserExitButton = new comps.BrowserExitButton(ctrls.BACK, {});
}
