import { AbstractView, AbstractComponent } from 'taktil';
import {
    ModeGate, ViewToggle, RestartButton, LoopToggle,
    MetronomeToggle, PlayToggle, PreRollToggle,
} from 'taktil/contrib/components';
import controls from './controls';
import * as comps from './components';
import store from './store';


export class BaseView extends AbstractView {
    // Top Left
    arrangeLayoutButton = new comps.LayoutButton(controls.ARRANGE, { layout: 'ARRANGE'});
    mixLayoutButton = new comps.LayoutButton(controls.MIX, { layout: 'MIX'});
    editLayoutButton = new comps.LayoutButton(controls.SAMPLING, { layout: 'EDIT'});
    toggleBrowserButton = new comps.BrowserToggle(controls.BROWSE, {});

    // Performance
    tempoButton = new comps.TempoButton(controls.TAP, { transport: store.transport });

    // Groups
    trackButtons = [
        controls.GROUP_A, controls.GROUP_B, controls.GROUP_C, controls.GROUP_D,
        controls.GROUP_E, controls.GROUP_F, controls.GROUP_G, controls.GROUP_H,
    ].map((control, index) => new comps.TrackButton(control, { index }));

    trackNavButtons = [
        controls.GROUP_A, controls.GROUP_B, controls.GROUP_C, controls.GROUP_D,
        controls.GROUP_E, controls.GROUP_F, controls.GROUP_G, controls.GROUP_H,
    ].map((control, index) => new comps.TrackBankNavigationButton(control, 'SHIFT', { index }));

    volumeKnobs = [
        controls.VOL_A, controls.VOL_B, controls.VOL_C, controls.VOL_D,
        controls.VOL_E, controls.VOL_F, controls.VOL_G, controls.VOL_H,
    ].map((control, index) => new comps.VolumeRange(control, { track: store.trackBank.getChannel(index) as API.Track }));

    volumeKnobsTouch = [
        controls.VOL_TOUCH_A, controls.VOL_TOUCH_B, controls.VOL_TOUCH_C, controls.VOL_TOUCH_D,
        controls.VOL_TOUCH_E, controls.VOL_TOUCH_F, controls.VOL_TOUCH_G, controls.VOL_TOUCH_H,
    ].map((control, index) => new comps.VolumeKnobTouch(control, { index }));

    masterVolume = new comps.VolumeRange(controls.KNOB, { track: store.masterTrack });

    // Transport
    restartButton = new RestartButton(controls.RESTART, { transport: store.transport });
    loopToggle = new LoopToggle(controls.RESTART, 'SHIFT', { transport: store.transport });
    metronomeToggle = new MetronomeToggle(controls.METRO, { transport: store.transport });
    shiftModeGate = new ModeGate(controls.GRID, { mode: 'SHIFT' });
    playToggle = new PlayToggle(controls.PLAY, { transport: store.transport });
    armToggle = new comps.ArmToggle(controls.REC, { track: store.cursorTrack });
    preRollToggle = new PreRollToggle(controls.REC, 'SHIFT', { transport: store.transport });

    // Pads
    sceneViewButton = new ViewToggle(controls.SCENE, { view: SceneView });
    patternViewButton = new ViewToggle(controls.PATTERN, { view: PatternView });
    padMidiViewButton = new ViewToggle(controls.PAD_MODE, { view: PadMidiView });
    navigateViewButton = new ViewToggle(controls.NAVIGATE, { view: NavigateView });
    duplicateModeGate = new ModeGate(controls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new ModeGate(controls.SELECT, { mode: 'SELECT' });
    soloModeGate = new ModeGate(controls.SOLO, { mode: 'SOLO' });
    muteModeGate = new ModeGate(controls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new comps.ActionButton(controls.UNDO, { action: 'undo' });
    redoButton = new comps.ActionButton(controls.REDO, { action: 'redo' });
    copyButton = new comps.ActionButton(controls.COPY, { action: 'copy' });
    pasteButton = new comps.ActionButton(controls.PASTE, { action: 'paste' });
    deleteButton = new comps.ActionButton(controls.CLEAR, { action: 'delete' });
    toggleBrowserRing = new comps.BrowserToggle(controls.JOG_RING, {});
    tempoRing = new comps.TempoRing(controls.JOG_RING, 'TEMPO', {});
    browserExitButton = new comps.BrowserExitButton(controls.BACK, {});
}

export class SceneView extends AbstractView {
    static parent = BaseView;
    sceneButtons = [
        controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
        controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
        controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
        controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
    ].map((control, index) => new comps.SceneButton(control, { index }));
}

export class PatternView extends AbstractView {
    static parent = BaseView;

    clipSlotButtons = [
        controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
        controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
        controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
        controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
    ].map((control, index) => new comps.ClipSlotButton(control, { index }));
}

export class PadMidiView extends AbstractView {
    static parent = BaseView;
}

export class NavigateView extends AbstractView {
    static parent = BaseView;
}
