import { View } from 'taktil';

import controls from '../controls';
import * as components from 'components';
import store from 'store';

export default class BaseView extends View {
    // Top Left
    // arrangeLayoutButton = new components.LayoutButton(controls.ARRANGE, { layout: 'ARRANGE' });
    // mixLayoutButton = new components.LayoutButton(controls.MIX, { layout: 'MIX' });
    // editLayoutButton = new components.LayoutButton(controls.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new components.BrowserToggle(controls.BROWSE, {});

    // Performance
    tempoButton = new components.TempoButton(controls.ENTER, 'SHIFT', {
        transport: store.transport,
    });

    // Groups
    groupButton = new components.ModeButton(controls.GROUP, { mode: 'GROUP', pinnable: true });

    trackButtons = [
        controls.PAD_13,
        controls.PAD_14,
        controls.PAD_15,
        controls.PAD_16,
        controls.PAD_9,
        controls.PAD_10,
        controls.PAD_11,
        controls.PAD_12,
    ].map((control, index) => new components.TrackButton(control, 'GROUP', { index }));

    // trackNavButtons = [
    //     controls.PAD_13,
    //     controls.PAD_14,
    //     controls.PAD_15,
    //     controls.PAD_16,
    //     controls.PAD_9,
    //     controls.PAD_10,
    //     controls.PAD_11,
    //     controls.PAD_12,
    // ].map(
    //     (control, index) => new components.TrackBankNavigationButton(control, 'SHIFT', { index })
    // );

    // Transport
    restartButton = new components.RestartButton(controls.RESTART, { transport: store.transport });
    loopToggle = new components.LoopToggle(controls.RESTART, 'SHIFT', {
        transport: store.transport,
    });
    metronomeToggle = new components.MetronomeToggle(controls.PLAY, 'SHIFT', {
        transport: store.transport,
    });
    shiftButton = new components.ModeButton(controls.GRID, { mode: 'SHIFT' });
    playToggle = new components.PlayToggle(controls.PLAY, { transport: store.transport });
    armToggle = new components.ArmToggle(controls.REC, { track: store.cursorTrack });
    preRollToggle = new components.PreRollToggle(controls.REC, 'SHIFT', {
        transport: store.transport,
    });

    // Pads
    sceneViewButton = new components.ViewToggle(controls.SCENE, { view: 'SceneView' });
    patternViewButton = new components.ViewToggle(controls.PATTERN, { view: 'PatternView' });
    // padMidiViewButton = new components.ViewToggle(controls.PAD_MODE, { view: 'PadMidiView' });
    // navigateViewButton = new components.ViewToggle(controls.NAVIGATE, { view: 'NavigateView' });
    duplicateModeGate = new components.ModeGate(controls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new components.ModeGate(controls.SELECT, { mode: 'SELECT' });
    soloModeGate = new components.ModeGate(controls.SOLO, { mode: 'SOLO' });
    muteModeGate = new components.ModeGate(controls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new components.ActionButton(controls.PAD_1, 'SHIFT', { action: 'undo' });
    redoButton = new components.ActionButton(controls.PAD_2, 'SHIFT', { action: 'redo' });
    copyButton = new components.ActionButton(controls.PAD_11, 'SHIFT', { action: 'copy' });
    pasteButton = new components.ActionButton(controls.PAD_12, 'SHIFT', { action: 'paste' });
    deleteButton = new components.ActionButton(controls.PAD_9, 'SHIFT', { action: 'delete' });
}
