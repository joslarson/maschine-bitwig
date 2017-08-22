import { View } from 'taktil';

import * as components from '../../components';
import { controls } from '../controls';
import { daw } from '../../daw';

export class BaseView extends View {
    // Top Left
    arrangeLayoutButton = new components.LayoutButton(controls.ARRANGE, {
        application: daw.application,
        layout: 'ARRANGE',
    });
    mixLayoutButton = new components.LayoutButton(controls.MIX, {
        application: daw.application,
        layout: 'MIX',
    });
    editLayoutButton = new components.LayoutButton(controls.SAMPLING, {
        application: daw.application,
        layout: 'EDIT',
    });
    toggleBrowserButton = new components.BrowserToggle(controls.BROWSE, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });

    // Performance
    tempoButton = new components.TempoButton(controls.TAP, { transport: daw.transport });

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
    ].map(
        (control, index) =>
            new components.TrackButton(control, {
                application: daw.application,
                transport: daw.transport,
                trackBank: daw.trackBank,
                index,
            })
    );

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
        (control, index) =>
            new components.TrackBankNavigationButton(control, 'SHIFT', {
                trackBank: daw.trackBank,
                index,
            })
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
                transport: daw.transport,
                track: daw.trackBank.getChannel(index) as API.Track,
            })
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
    ].map(
        (control, index) =>
            new components.VolumeKnobTouch(control, { trackBank: daw.trackBank, index })
    );

    masterVolume = new components.VolumeRange(controls.KNOB, {
        transport: daw.transport,
        track: daw.masterTrack,
        meter: true,
    });

    // Transport
    restartButton = new components.RestartButton(controls.RESTART, { transport: daw.transport });
    loopToggle = new components.LoopToggle(controls.RESTART, 'SHIFT', {
        transport: daw.transport,
    });
    metronomeToggle = new components.MetronomeToggle(controls.METRO, {
        transport: daw.transport,
    });
    shiftButton = new components.ModeButton(controls.GRID, { mode: 'SHIFT' });
    playToggle = new components.PlayToggle(controls.PLAY, { transport: daw.transport });
    armToggle = new components.ArmToggle(controls.REC, { track: daw.cursorTrack });
    preRollToggle = new components.PreRollToggle(controls.REC, 'SHIFT', {
        transport: daw.transport,
    });

    // Pads
    sceneViewButton = new components.ViewToggle(controls.SCENE, { view: 'SceneView' });
    patternViewButton = new components.ViewToggle(controls.PATTERN, { view: 'PatternView' });
    padMidiViewButton = new components.ViewToggle(controls.PAD_MODE, { view: 'PadMidiView' });
    navigateViewButton = new components.ViewToggle(controls.NAVIGATE, { view: 'NavigateView' });
    duplicateModeGate = new components.ModeGate(controls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new components.ModeGate(controls.SELECT, { mode: 'SELECT' });
    soloModeGate = new components.ModeGate(controls.SOLO, { mode: 'SOLO' });
    muteModeGate = new components.ModeGate(controls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new components.ActionButton(controls.UNDO, {
        application: daw.application,
        action: 'undo',
    });
    redoButton = new components.ActionButton(controls.REDO, {
        application: daw.application,
        action: 'redo',
    });
    copyButton = new components.ActionButton(controls.COPY, {
        application: daw.application,
        action: 'copy',
    });
    pasteButton = new components.ActionButton(controls.PASTE, {
        application: daw.application,
        action: 'paste',
    });
    deleteButton = new components.ActionButton(controls.CLEAR, {
        application: daw.application,
        action: 'delete',
    });
    toggleBrowserRing = new components.BrowserToggle(controls.JOG_RING, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });
    tempoDial = new components.TempoRing(controls.JOG_DIAL, 'TEMPO', {
        transport: daw.transport,
    });
    tempoRing = new components.TempoRing(controls.JOG_RING, 'TEMPO', {
        transport: daw.transport,
    });
    browserExitButton = new components.BrowserExitButton(controls.BACK, {
        popupBrowser: daw.popupBrowser,
    });
}
