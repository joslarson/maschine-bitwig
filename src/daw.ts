import { NoteInputProxy } from 'NoteInput';
import taktil from 'taktil';

export class Daw {
    noteInput: NoteInputProxy;
    transport: API.Transport;
    application: API.Application;
    cursorTrack: API.CursorTrack;
    cursorDevice: API.CursorDevice;
    trackBank: API.TrackBank;
    popupBrowser: API.PopupBrowser;
    sceneBank: API.SceneBank;
    createScene: API.Action;
    masterTrack: API.MasterTrack;
    drumPadBank: API.DrumPadBank;
    [rest: string]: any;

    constructor() {
        taktil.on('init', this.onInit.bind(this));
    }

    onInit() {
        this.noteInput = new NoteInputProxy(
            host.getMidiInPort(0).createNoteInput('PADS', '95????')
        );
        this.noteInput.shouldConsumeEvents = false;

        taktil.on('activateView', this.enableDisableNoteInput);
        taktil.on('activateMode', this.enableDisableNoteInput);
        taktil.on('deactivateMode', this.enableDisableNoteInput);

        // transport
        this.transport = host.createTransport();
        this.transport.tempo().markInterested();
        this.transport.getPosition().markInterested();
        this.transport.isPlaying().markInterested();

        // application
        this.application = host.createApplication();

        // cursorTrack
        this.cursorTrack = host.createArrangerCursorTrack(0, 16);
        this.cursorTrack.isGroup().markInterested();
        this.cursorTrack.color().markInterested();

        // trackBank
        this.trackBank = host.createMainTrackBank(8, 0, 0);
        this.trackBank.channelCount().markInterested();
        this.trackBank.setChannelScrollStepSize(8);
        this.trackBank.followCursorTrack(this.cursorTrack);
        // keep bank scrolled to pages only
        this.trackBank.scrollPosition().addValueObserver(position => {
            if (position % 8 !== 0) {
                this.trackBank.scrollPosition().set(Math.ceil(position / 8) * 8);
            }
        });

        // popupBrowser
        this.popupBrowser = host.createPopupBrowser();
        this.popupBrowser
            .exists()
            .addValueObserver(
                exists => (exists ? taktil.activateMode('BROWSE') : taktil.deactivateMode('BROWSE'))
            );

        // sceneBank
        this.sceneBank = host.createSceneBank(16);
        this.sceneBank.subscribe();

        // actions
        this.createScene = this.application.getAction('Create Scene');

        // masterTrack
        this.masterTrack = host.createMasterTrack(0);
        this.masterTrack.exists().markInterested();

        // cursorDevice
        this.cursorDevice = this.cursorTrack.createCursorDevice();
        this.drumPadBank = this.cursorDevice.createDrumPadBank(16);
        this.drumPadBank.exists().markInterested();
        this.drumPadBank.channelCount().markInterested();
        this.drumPadBank.scrollPosition().markInterested();
        // keep drum pad bank scroll position in sync with note input
        this.drumPadBank.exists().addValueObserver(exists => {
            if (exists) {
                const position = this.noteInput.keyTranslationTable[36];
                this.drumPadBank.scrollPosition().set(position);
            }
        });
    }

    enableDisableNoteInput = () => {
        const baseView = taktil.getActiveView() === 'BASE';
        const selectMode = taktil.modeIsActive('SELECT');
        const soloMode = taktil.modeIsActive('SOLO');
        const muteMode = taktil.modeIsActive('MUTE');

        if (baseView && !selectMode && !soloMode && !muteMode) {
            this.noteInput.enable();
        } else {
            this.noteInput.disable();
        }
    };
}

export const daw = new Daw();
