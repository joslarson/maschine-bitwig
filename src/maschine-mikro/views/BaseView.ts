import taktil from 'taktil';

import { ActionButton } from '../../components/ActionButton';
import {
    ArmToggle,
    LoopToggle,
    MetronomeToggle,
    PlayToggle,
    PreRollToggle,
    RestartButton,
    TempoButton,
} from '../../components/transport';
import { BrowserToggle } from '../../components/BrowserToggle';
import { LayoutButton } from '../../components/LayoutButton';
import { ModeButton } from '../../components/ModeButton';
import { TrackBankNavigationButton } from '../../components/TrackBankNavigationButton';
import { TrackButton } from '../../components/TrackButton';
import { ViewToggle, ModeGate } from '../../components/views';

import { controls } from '../controls';
import { daw } from '../../daw';

export class BaseView extends taktil.View {
    // Top Left
    // arrangeLayoutButton = new LayoutButton(controls.ARRANGE, { layout: 'ARRANGE' });
    // mixLayoutButton = new LayoutButton(controls.MIX, { layout: 'MIX' });
    // editLayoutButton = new LayoutButton(controls.SAMPLING, { layout: 'EDIT' });
    toggleBrowserButton = new BrowserToggle(controls.BROWSE, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });

    // Performance
    tempoButton = new TempoButton(controls.ENTER, {
        mode: 'SHIFT',
        transport: daw.transport,
    });

    // Groups
    groupButton = new ModeButton(controls.GROUP, { targetMode: 'GROUP', pinnable: true });

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
            new TrackButton(control, {
                index,
                mode: 'GROUP',
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
    //         new TrackBankNavigationButton(control, {
    //             index,
    //             mode: 'SHIFT',
    //             trackBank: daw.trackBank,
    //         })
    // );

    // Transport
    restartButton = new RestartButton(controls.RESTART, { transport: daw.transport });
    loopToggle = new LoopToggle(controls.RESTART, {
        mode: 'SHIFT',
        transport: daw.transport,
    });
    metronomeToggle = new MetronomeToggle(controls.PLAY, {
        mode: 'SHIFT',
        transport: daw.transport,
    });
    shiftButton = new ModeButton(controls.GRID, { targetMode: 'SHIFT' });
    playToggle = new PlayToggle(controls.PLAY, { transport: daw.transport });
    armToggle = new ArmToggle(controls.REC, { track: daw.cursorTrack });
    preRollToggle = new PreRollToggle(controls.REC, {
        mode: 'SHIFT',
        transport: daw.transport,
    });

    // Pads
    sceneViewButton = new ViewToggle(controls.SCENE, { view: 'SCENE' });
    patternViewButton = new ViewToggle(controls.PATTERN, { view: 'PATTERN' });
    // padMidiViewButton = new components.ViewToggle(controls.PAD_MODE, { view: 'PAD_MIDI' });
    // navigateViewButton = new components.ViewToggle(controls.NAVIGATE, { view: 'NAVIGATE' });
    duplicateModeGate = new ModeGate(controls.DUPLICATE, { targetMode: 'DUPLICATE' });
    selectModeGate = new ModeGate(controls.SELECT, { targetMode: 'SELECT' });
    soloModeGate = new ModeGate(controls.SOLO, { targetMode: 'SOLO' });
    muteModeGate = new ModeGate(controls.MUTE, { targetMode: 'MUTE' });

    // Edit
    undoButton = new ActionButton(controls.PAD_1, {
        mode: 'SHIFT',
        application: daw.application,
        action: 'undo',
    });
    redoButton = new ActionButton(controls.PAD_2, {
        mode: 'SHIFT',
        application: daw.application,
        action: 'redo',
    });
    copyButton = new ActionButton(controls.PAD_11, {
        mode: 'SHIFT',
        application: daw.application,
        action: 'copy',
    });
    pasteButton = new ActionButton(controls.PAD_12, {
        mode: 'SHIFT',
        application: daw.application,
        action: 'paste',
    });
    deleteButton = new ActionButton(controls.PAD_9, {
        mode: 'SHIFT',
        application: daw.application,
        action: 'delete',
    });
}
