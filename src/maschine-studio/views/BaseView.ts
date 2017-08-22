import { View } from 'taktil';

import { ActionButton } from '../../components/ActionButton';
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
import { BrowserExitButton } from '../../components/BrowserExitButton';
import { BrowserToggle } from '../../components/BrowserToggle';
import { LayoutButton } from '../../components/LayoutButton';
import { ModeButton } from '../../components/ModeButton';
import { TrackBankNavigationButton } from '../../components/TrackBankNavigationButton';
import { TrackButton } from '../../components/TrackButton';
import { ViewToggle, ModeGate } from '../../components/views';
import { VolumeKnobTouch } from '../../components/VolumeKnobTouch';
import { VolumeRange } from '../../components/VolumeRange';

import { controls } from '../controls';
import { daw } from '../../daw';

export class BaseView extends View {
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
            new TrackBankNavigationButton(control, 'SHIFT', {
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
    loopToggle = new LoopToggle(controls.RESTART, 'SHIFT', {
        transport: daw.transport,
    });
    metronomeToggle = new MetronomeToggle(controls.METRO, {
        transport: daw.transport,
    });
    shiftButton = new ModeButton(controls.GRID, { mode: 'SHIFT' });
    playToggle = new PlayToggle(controls.PLAY, { transport: daw.transport });
    armToggle = new ArmToggle(controls.REC, { track: daw.cursorTrack });
    preRollToggle = new PreRollToggle(controls.REC, 'SHIFT', {
        transport: daw.transport,
    });

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
    tempoDial = new TempoRing(controls.JOG_DIAL, 'TEMPO', {
        transport: daw.transport,
    });
    tempoRing = new TempoRing(controls.JOG_RING, 'TEMPO', {
        transport: daw.transport,
    });
    browserExitButton = new BrowserExitButton(controls.BACK, {
        popupBrowser: daw.popupBrowser,
    });
}
