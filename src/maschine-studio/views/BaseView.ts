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
    arrangeLayoutButton = new LayoutButton(controls.ARRANGE, {
        application: daw.application,
        layout: 'ARRANGE',
    });
    mixLayoutButton = new LayoutButton(controls.MIX, {
        application: daw.application,
        layout: 'MIX',
    });
    editLayoutButton = new LayoutButton(controls.SAMPLING, {
        application: daw.application,
        layout: 'EDIT',
    });
    toggleBrowserButton = new BrowserToggle(controls.BROWSE, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });

    // Performance
    tempoButton = new TempoButton(controls.TAP, { transport: daw.transport });

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
                trackBank: daw.trackBank,
                cursorTrack: daw.cursorTrack,
                application: daw.application,
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
            new VolumeRange(control, {
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
    ].map((control, index) => new VolumeKnobTouch(control, { trackBank: daw.trackBank, index }));

    masterVolume = new VolumeRange(controls.KNOB, {
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
    metronomeToggle = new MetronomeToggle(controls.METRO, {
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
    undoButton = new ActionButton(controls.UNDO, {
        application: daw.application,
        action: 'undo',
    });
    redoButton = new ActionButton(controls.REDO, {
        application: daw.application,
        action: 'redo',
    });
    copyButton = new ActionButton(controls.COPY, {
        application: daw.application,
        action: 'copy',
    });
    pasteButton = new ActionButton(controls.PASTE, {
        application: daw.application,
        action: 'paste',
    });
    deleteButton = new ActionButton(controls.CLEAR, {
        application: daw.application,
        action: 'delete',
    });
    toggleBrowserRing = new BrowserToggle(controls.JOG_RING, {
        cursorTrack: daw.cursorTrack,
        popupBrowser: daw.popupBrowser,
    });
    tempoDial = new TempoRing(controls.JOG_DIAL, {
        mode: 'TEMPO',
        transport: daw.transport,
    });
    tempoRing = new TempoRing(controls.JOG_RING, {
        mode: 'TEMPO',
        transport: daw.transport,
    });
    browserExitButton = new BrowserExitButton(controls.BACK, {
        popupBrowser: daw.popupBrowser,
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
