import { View } from 'taktil';

import controls from '../controls';
import * as components from 'components';
import store from 'store';

export default class BaseView extends View {
    // Top Left
    // arrangeLayoutButton = new components.LayoutButton(controls.ARRANGE, { layout: 'ARRANGE' });
    // mixLayoutButton = new components.LayoutButton(controls.MIX, { layout: 'MIX' });
    // editLayoutButton = new components.LayoutButton(controls.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new components.BrowserToggle(controls.BROWSE);

    // Performance
    tempoButton = new components.TempoButton(
        controls.ENTER,
        { transport: store.transport },
        'SHIFT'
    );

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
    ].map((control, index) => new components.TrackButton(control, { index }, 'GROUP'));

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
    //     (control, index) => new components.TrackBankNavigationButton(control, { index }, 'SHIFT')
    // );

    // Transport
    restartButton = new components.RestartButton(controls.RESTART, { transport: store.transport });
    loopToggle = new components.LoopToggle(
        controls.RESTART,
        { transport: store.transport },
        'SHIFT'
    );
    metronomeToggle = new components.MetronomeToggle(
        controls.PLAY,
        { transport: store.transport },
        'SHIFT'
    );
    shiftButton = new components.ModeButton(controls.GRID, { mode: 'SHIFT' });
    playToggle = new components.PlayToggle(controls.PLAY, { transport: store.transport });
    armToggle = new components.ArmToggle(controls.REC, { track: store.cursorTrack });
    preRollToggle = new components.PreRollToggle(
        controls.REC,
        { transport: store.transport },
        'SHIFT'
    );

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
    undoButton = new components.ActionButton(controls.PAD_1, { action: 'undo' }, 'SHIFT');
    redoButton = new components.ActionButton(controls.PAD_2, { action: 'redo' }, 'SHIFT');
    copyButton = new components.ActionButton(controls.PAD_11, { action: 'copy' }, 'SHIFT');
    pasteButton = new components.ActionButton(controls.PAD_12, { action: 'paste' }, 'SHIFT');
    deleteButton = new components.ActionButton(controls.PAD_9, { action: 'delete' }, 'SHIFT');
}
