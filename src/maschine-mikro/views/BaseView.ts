import { View } from 'taktil';

import * as components from '../../components';
import { controls } from '../controls';
import { daw } from '../../daw';

export class BaseView extends View {
    // Top Left
    // arrangeLayoutButton = new components.LayoutButton(controls.ARRANGE, { layout: 'ARRANGE' });
    // mixLayoutButton = new components.LayoutButton(controls.MIX, { layout: 'MIX' });
    // editLayoutButton = new components.LayoutButton(controls.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new components.BrowserToggle(controls.BROWSE, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });

    // Performance
    tempoButton = new components.TempoButton(controls.ENTER, 'SHIFT', {
        transport: daw.transport,
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
    ].map(
        (control, index) =>
            new components.TrackButton(control, 'GROUP', {
                index,
                application: daw.application,
                transport: daw.transport,
                trackBank: daw.trackBank,
            })
    );

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
    //     (control, index) =>
    //         new components.TrackBankNavigationButton(control, 'SHIFT', {
    //             index,
    //             trackBank: bitwig.trackBank,
    //         })
    // );

    // Transport
    restartButton = new components.RestartButton(controls.RESTART, { transport: daw.transport });
    loopToggle = new components.LoopToggle(controls.RESTART, 'SHIFT', {
        transport: daw.transport,
    });
    metronomeToggle = new components.MetronomeToggle(controls.PLAY, 'SHIFT', {
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
    // padMidiViewButton = new components.ViewToggle(controls.PAD_MODE, { view: 'PadMidiView' });
    // navigateViewButton = new components.ViewToggle(controls.NAVIGATE, { view: 'NavigateView' });
    duplicateModeGate = new components.ModeGate(controls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new components.ModeGate(controls.SELECT, { mode: 'SELECT' });
    soloModeGate = new components.ModeGate(controls.SOLO, { mode: 'SOLO' });
    muteModeGate = new components.ModeGate(controls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new components.ActionButton(controls.PAD_1, 'SHIFT', {
        application: daw.application,
        action: 'undo',
    });
    redoButton = new components.ActionButton(controls.PAD_2, 'SHIFT', {
        application: daw.application,
        action: 'redo',
    });
    copyButton = new components.ActionButton(controls.PAD_11, 'SHIFT', {
        application: daw.application,
        action: 'copy',
    });
    pasteButton = new components.ActionButton(controls.PAD_12, 'SHIFT', {
        application: daw.application,
        action: 'paste',
    });
    deleteButton = new components.ActionButton(controls.PAD_9, 'SHIFT', {
        application: daw.application,
        action: 'delete',
    });
}
