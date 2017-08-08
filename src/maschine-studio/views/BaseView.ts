import { View } from 'taktil';

import template from '../template';
import * as components from 'components';
import store from 'store';

export default class BaseView extends View {
    // Top Left
    arrangeLayoutButton = new components.LayoutButton(template.ARRANGE, { layout: 'ARRANGE' });
    mixLayoutButton = new components.LayoutButton(template.MIX, { layout: 'MIX' });
    editLayoutButton = new components.LayoutButton(template.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new components.BrowserToggle(template.BROWSE);

    // Performance
    tempoButton = new components.TempoButton(template.TAP, { transport: store.transport });

    // Groups
    trackButtons = [
        template.GROUP_A,
        template.GROUP_B,
        template.GROUP_C,
        template.GROUP_D,
        template.GROUP_E,
        template.GROUP_F,
        template.GROUP_G,
        template.GROUP_H,
    ].map((control, index) => new components.TrackButton(control, { index }));

    trackNavButtons = [
        template.GROUP_A,
        template.GROUP_B,
        template.GROUP_C,
        template.GROUP_D,
        template.GROUP_E,
        template.GROUP_F,
        template.GROUP_G,
        template.GROUP_H,
    ].map(
        (control, index) => new components.TrackBankNavigationButton(control, { index }, 'SHIFT')
    );

    volumeKnobs = [
        template.VOL_A,
        template.VOL_B,
        template.VOL_C,
        template.VOL_D,
        template.VOL_E,
        template.VOL_F,
        template.VOL_G,
        template.VOL_H,
    ].map(
        (control, index) =>
            new components.VolumeRange(control, {
                track: store.trackBank.getChannel(index) as API.Track,
            })
    );

    volumeKnobsTouch = [
        template.VOL_TOUCH_A,
        template.VOL_TOUCH_B,
        template.VOL_TOUCH_C,
        template.VOL_TOUCH_D,
        template.VOL_TOUCH_E,
        template.VOL_TOUCH_F,
        template.VOL_TOUCH_G,
        template.VOL_TOUCH_H,
    ].map((control, index) => new components.VolumeKnobTouch(control, { index }));

    masterVolume = new components.VolumeRange(template.KNOB, { track: store.masterTrack });

    // Transport
    restartButton = new components.RestartButton(template.RESTART, { transport: store.transport });
    loopToggle = new components.LoopToggle(
        template.RESTART,
        { transport: store.transport },
        'SHIFT'
    );
    metronomeToggle = new components.MetronomeToggle(template.METRO, {
        transport: store.transport,
    });
    shiftButton = new components.ShiftButton(template.GRID);
    playToggle = new components.PlayToggle(template.PLAY, { transport: store.transport });
    armToggle = new components.ArmToggle(template.REC, { track: store.cursorTrack });
    preRollToggle = new components.PreRollToggle(
        template.REC,
        { transport: store.transport },
        'SHIFT'
    );

    // Pads
    sceneViewButton = new components.ViewToggle(template.SCENE, { view: 'SceneView' });
    patternViewButton = new components.ViewToggle(template.PATTERN, { view: 'PatternView' });
    padMidiViewButton = new components.ViewToggle(template.PAD_MODE, { view: 'PadMidiView' });
    navigateViewButton = new components.ViewToggle(template.NAVIGATE, { view: 'NavigateView' });
    duplicateModeGate = new components.ModeGate(template.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new components.ModeGate(template.SELECT, { mode: 'SELECT' });
    soloModeGate = new components.ModeGate(template.SOLO, { mode: 'SOLO' });
    muteModeGate = new components.ModeGate(template.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new components.ActionButton(template.UNDO, { action: 'undo' });
    redoButton = new components.ActionButton(template.REDO, { action: 'redo' });
    copyButton = new components.ActionButton(template.COPY, { action: 'copy' });
    pasteButton = new components.ActionButton(template.PASTE, { action: 'paste' });
    deleteButton = new components.ActionButton(template.CLEAR, { action: 'delete' });
    toggleBrowserRing = new components.BrowserToggle(template.JOG_RING);
    tempoRing = new components.TempoRing(template.JOG_RING, 'TEMPO');
    browserExitButton = new components.BrowserExitButton(template.BACK);
}
