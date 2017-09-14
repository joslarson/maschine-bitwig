import { ViewStack } from 'taktil';

import { ActionButton } from '../../components/ActionButton';
import { TempoButton, TempoRing } from '../../components/transport';
import { BrowserExitButton } from '../../components/BrowserExitButton';
import { BrowserToggle } from '../../components/BrowserToggle';
import { BrowseWheel } from '../../components/browser';
import { LayoutButton } from '../../components/LayoutButton';
import { ModeButton } from '../../components/ModeButton';
import { ViewToggle, ModeGate } from '../../components/views';
import { VolumeKnobTouch } from '../../components/VolumeKnobTouch';
import { VolumeRange } from '../../components/VolumeRange';

import { controls } from '../controls';
import { daw } from '../../daw';

import { TransportView } from './TransportView';
import { GroupsView } from './GroupsView';

export class BaseView extends ViewStack(TransportView, GroupsView) {
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

    // Pads
    sceneViewButton = new ViewToggle(controls.SCENE, { view: 'SCENE' });
    patternViewButton = new ViewToggle(controls.PATTERN, { view: 'PATTERN' });
    padMidiViewButton = new ViewToggle(controls.PAD_MODE, { view: 'PAD_MIDI' });
    navigateViewButton = new ViewToggle(controls.NAVIGATE, { view: 'NAVIGATE' });
    duplicateModeButton = new ModeButton(controls.DUPLICATE, { targetMode: 'DUPLICATE' });
    selectModeButton = new ModeButton(controls.SELECT, { targetMode: 'SELECT' });
    soloModeButton = new ModeButton(controls.SOLO, { targetMode: 'SOLO' });
    muteModeButton = new ModeButton(controls.MUTE, { targetMode: 'MUTE' });

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
        mode: 'BROWSE',
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
        mode: 'BROWSE',
        popupBrowser: daw.popupBrowser,
    });
    browseWheel = new BrowseWheel(controls.JOG_DIAL, {
        mode: 'BROWSE',
        popupBrowser: daw.popupBrowser,
    });
}
