import { AbstractView, AbstractComponent } from 'taktil';
import {
    ModeGate, ViewToggle, RestartButton, LoopToggle,
    MetronomeToggle, PlayToggle, PreRollToggle,
} from 'taktil/contrib/components';
import ctrls from './controls';
import * as comps from './components';
import store from './store';


export class BaseView extends AbstractView {
    // Top Left
    arrangeLayoutButton = new comps.LayoutButton(ctrls.ARRANGE, { layout: 'ARRANGE'});
    mixLayoutButton = new comps.LayoutButton(ctrls.MIX, { layout: 'MIX'});
    editLayoutButton = new comps.LayoutButton(ctrls.SAMPLING, { layout: 'EDIT'});
    toggleBrowserButton = new comps.BrowserToggle(ctrls.BROWSE, {});

    // Performance
    tempoButton = new comps.TempoButton(ctrls.TAP, { transport: store.transport });

    // Groups
    trackButtons = [
        ctrls.GROUP_A, ctrls.GROUP_B, ctrls.GROUP_C, ctrls.GROUP_D,
        ctrls.GROUP_E, ctrls.GROUP_F, ctrls.GROUP_G, ctrls.GROUP_H,
    ].map((control, index) => new comps.TrackButton(control, { index }));

    trackNavButtons = [
        ctrls.GROUP_A, ctrls.GROUP_B, ctrls.GROUP_C, ctrls.GROUP_D,
        ctrls.GROUP_E, ctrls.GROUP_F, ctrls.GROUP_G, ctrls.GROUP_H,
    ].map((control, index) => new comps.TrackBankNavigationButton(control, 'SHIFT', { index }));

    volumeKnobs = [
        ctrls.VOL_A, ctrls.VOL_B, ctrls.VOL_C, ctrls.VOL_D,
        ctrls.VOL_E, ctrls.VOL_F, ctrls.VOL_G, ctrls.VOL_H,
    ].map((control, index) => new comps.VolumeRange(control, { track: store.trackBank.getChannel(index) as API.Track }));

    volumeKnobsTouch = [
        ctrls.VOL_TOUCH_A, ctrls.VOL_TOUCH_B, ctrls.VOL_TOUCH_C, ctrls.VOL_TOUCH_D,
        ctrls.VOL_TOUCH_E, ctrls.VOL_TOUCH_F, ctrls.VOL_TOUCH_G, ctrls.VOL_TOUCH_H,
    ].map((control, index) => new comps.VolumeKnobTouch(control, { index }));

    masterVolume = new comps.VolumeRange(ctrls.KNOB, { track: store.masterTrack });

    // Transport
    restartButton = new RestartButton(ctrls.RESTART, { transport: store.transport });
    loopToggle = new LoopToggle(ctrls.RESTART, 'SHIFT', { transport: store.transport });
    metronomeToggle = new MetronomeToggle(ctrls.METRO, { transport: store.transport });
    shiftModeGate = new ModeGate(ctrls.GRID, { mode: 'SHIFT' });
    playToggle = new PlayToggle(ctrls.PLAY, { transport: store.transport });
    armToggle = new comps.ArmToggle(ctrls.REC, { track: store.cursorTrack });
    preRollToggle = new PreRollToggle(ctrls.REC, 'SHIFT', { transport: store.transport });

    // Pads
    sceneViewButton = new ViewToggle(ctrls.SCENE, { view: SceneView });
    patternViewButton = new ViewToggle(ctrls.PATTERN, { view: PatternView });
    padMidiViewButton = new ViewToggle(ctrls.PAD_MODE, { view: PadMidiView });
    navigateViewButton = new ViewToggle(ctrls.NAVIGATE, { view: NavigateView });
    duplicateModeGate = new ModeGate(ctrls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new ModeGate(ctrls.SELECT, { mode: 'SELECT' });
    soloModeGate = new ModeGate(ctrls.SOLO, { mode: 'SOLO' });
    muteModeGate = new ModeGate(ctrls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new comps.ActionButton(ctrls.UNDO, { action: 'undo' });
    redoButton = new comps.ActionButton(ctrls.REDO, { action: 'redo' });
    copyButton = new comps.ActionButton(ctrls.COPY, { action: 'copy' });
    pasteButton = new comps.ActionButton(ctrls.PASTE, { action: 'paste' });
    deleteButton = new comps.ActionButton(ctrls.CLEAR, { action: 'delete' });
    toggleBrowserRing = new comps.BrowserToggle(ctrls.JOG_RING, {});
    tempoRing = new comps.TempoRing(ctrls.JOG_RING, 'TEMPO', {});
    browserExitButton = new comps.BrowserExitButton(ctrls.BACK, {});
}

export class SceneView extends AbstractView {
    static parent = BaseView;
    sceneButtons = [
        ctrls.PAD_1,  ctrls.PAD_2,  ctrls.PAD_3,  ctrls.PAD_4,
        ctrls.PAD_5,  ctrls.PAD_6,  ctrls.PAD_7,  ctrls.PAD_8,
        ctrls.PAD_9,  ctrls.PAD_10, ctrls.PAD_11, ctrls.PAD_12,
        ctrls.PAD_13, ctrls.PAD_14, ctrls.PAD_15, ctrls.PAD_16,
    ].map((control, index) => new comps.SceneButton(control, { index }));
}

export class PatternView extends AbstractView {
    static parent = BaseView;

    clipSlotButtons = [
        ctrls.PAD_1,  ctrls.PAD_2,  ctrls.PAD_3,  ctrls.PAD_4,
        ctrls.PAD_5,  ctrls.PAD_6,  ctrls.PAD_7,  ctrls.PAD_8,
        ctrls.PAD_9,  ctrls.PAD_10, ctrls.PAD_11, ctrls.PAD_12,
        ctrls.PAD_13, ctrls.PAD_14, ctrls.PAD_15, ctrls.PAD_16,
    ].map((control, index) => new comps.ClipSlotButton(control, { index }));
}

export class PadMidiView extends AbstractView {
    static parent = BaseView;
}

export class NavigateView extends AbstractView {
    static parent = BaseView;
}
