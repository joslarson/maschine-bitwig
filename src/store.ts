class Store {
    transport: API.Transport;
    application: API.Application;
    cursorTrack: API.CursorTrack & API.Track;
    trackBank: API.TrackBank;
    popupBrowser: API.PopupBrowser;
    sceneBank: API.SceneBank;
    createScene: API.Action;
    masterTrack: API.MasterTrack;
    [rest: string]: any;

    constructor() {
        session.on('init', this.init.bind(this));
    }

    init() {
        // transport
        this.transport = host.createTransport();
        this.transport.tempo().markInterested();
        this.transport.getPosition().markInterested();

        // application
        this.application = host.createApplication();

        // cursorTrack
        this.cursorTrack = (host.createArrangerCursorTrack(0, 16) as any) as API.CursorTrack &
            API.Track;
        this.cursorTrack.isGroup().markInterested();
        this.cursorTrack.color().markInterested();

        // trackBank
        this.trackBank = host.createMainTrackBank(8, 0, 0);
        this.trackBank.channelCount().markInterested();
        this.trackBank.setChannelScrollStepSize(8);
        this.trackBank.followCursorTrack(this.cursorTrack);

        // popupBrowser
        this.popupBrowser = host.createPopupBrowser();

        // sceneBank
        this.sceneBank = host.createSceneBank(16);
        this.sceneBank.subscribe();

        // actions
        this.createScene = this.application.getAction('Create Scene');

        // masterTrack
        this.masterTrack = host.createMasterTrack(0);
        this.masterTrack.exists().markInterested();
    }
}

export default new Store();
