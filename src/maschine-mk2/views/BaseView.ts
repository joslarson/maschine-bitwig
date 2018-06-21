import { DrumPad } from 'components/DrumPad';
import { Transpose } from 'components/Transpose';
import taktil from 'taktil';
import { ActionButton } from '../../components/ActionButton';
import { BrowserExitButton } from '../../components/BrowserExitButton';
import { BrowserToggle } from '../../components/BrowserToggle';
import { LayoutButton } from '../../components/LayoutButton';
import { ModeButton } from '../../components/ModeButton';
import { TrackBankNavigationButton } from '../../components/TrackBankNavigationButton';
import { TrackButton } from '../../components/TrackButton';
import {
    ArmToggle,
    LoopToggle,
    MetronomeToggle,
    PlayToggle,
    PreRollToggle,
    RestartButton,
    TempoButton,
    TempoRing,
} from '../../components/transport';
import { ModeGate, ViewToggle } from '../../components/views';
import { VolumeKnobTouch } from '../../components/VolumeKnobTouch';
import { VolumeRange } from '../../components/VolumeRange';
import { daw } from '../../daw';
import { controls } from '../controls';

export class BaseView extends taktil.View {
    // Top Left
    editLayoutButton = new LayoutButton(controls.SAMPLING, {
        application: daw.application,
        layout: 'EDIT',
    });
    toggleBrowserButton = new BrowserToggle(controls.BROWSE, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });

    // Performance
    tempoButton = new TempoButton(controls.TEMPO, {
        transport: daw.transport,
    });
    tapTempoButton = new TempoButton(controls.NOTE_REPEAT, {
        mode: 'SHIFT',
        transport: daw.transport,
    });

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
            new TrackButton(control, {
                application: daw.application,
                cursorTrack: daw.cursorTrack,
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
            new TrackBankNavigationButton(control, {
                mode: 'SHIFT',
                application: daw.application,
                trackBank: daw.trackBank,
                cursorTrack: daw.cursorTrack,
                index,
            })
    );

    masterVolume = new VolumeRange(controls.KNOB_TURN, {
        transport: daw.transport,
        track: daw.masterTrack,
        meter: true,
    });

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
    sceneViewButton = new ViewToggle(controls.SCENE, { onView: 'SCENE', offView: 'BASE' });
    patternViewButton = new ViewToggle(controls.PATTERN, { onView: 'PATTERN', offView: 'BASE' });
    padMidiViewButton = new ModeGate(controls.PAD_MODE, { targetMode: 'PAD_MODE' });
    navigateViewButton = new ModeGate(controls.NAVIGATE, { targetMode: 'NAVIGATE' });
    duplicateModeGate = new ModeGate(controls.DUPLICATE, { targetMode: 'DUPLICATE' });
    selectModeGate = new ModeGate(controls.SELECT, { targetMode: 'SELECT' });
    soloModeGate = new ModeGate(controls.SOLO, { targetMode: 'SOLO' });
    muteModeGate = new ModeGate(controls.MUTE, { targetMode: 'MUTE' });

    // Track Mute

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
    tempoDial = new TempoRing(controls.KNOB_TURN, {
        mode: 'TEMPO',
        transport: daw.transport,
    });

    // DrumPad

    drumPads = [
        controls.PAD_1,
        controls.PAD_2,
        controls.PAD_3,
        controls.PAD_4,
        controls.PAD_5,
        controls.PAD_6,
        controls.PAD_7,
        controls.PAD_8,
        controls.PAD_9,
        controls.PAD_10,
        controls.PAD_11,
        controls.PAD_12,
        controls.PAD_13,
        controls.PAD_14,
        controls.PAD_15,
        controls.PAD_16,
    ].map(
        (control, index) =>
            new DrumPad(control, {
                transport: daw.transport,
                cursorTrack: daw.cursorTrack,
                drumPadBank: daw.drumPadBank,
                noteInput: daw.noteInput,
                index,
            })
    );

    transposeUp = new Transpose(controls.RIGHT_ARROW, {
        mode: 'PAD_MODE',
        noteInput: daw.noteInput,
        drumPadBank: daw.drumPadBank,
        direction: 'UP',
    });

    transposeDown = new Transpose(controls.LEFT_ARROW, {
        mode: 'PAD_MODE',
        noteInput: daw.noteInput,
        drumPadBank: daw.drumPadBank,
        direction: 'DOWN',
    });
}
