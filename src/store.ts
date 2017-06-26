interface Store {
    transport: API.Transport;
    application: API.Application;
    cursorTrack: API.CursorTrack & API.Track;
    trackBank: API.TrackBank;
    popupBrowser: API.PopupBrowser;
    sceneBank: API.SceneBank;
    createScene: API.Action;
    masterTrack: API.MasterTrack;
    [rest: string]: any;
}

const store: Store = {} as Store;

session.on('init', () => {
    // transport
    store.transport = host.createTransport();
    store.transport.tempo().markInterested();
    store.transport.getPosition().markInterested();

    // application
    store.application = host.createApplication();

    // cursorTrack
    store.cursorTrack = (host.createArrangerCursorTrack(0, 16) as any) as API.CursorTrack &
        API.Track;
    store.cursorTrack.isGroup().markInterested();
    store.cursorTrack.color().markInterested();

    // trackBank
    store.trackBank = host.createMainTrackBank(8, 0, 0);
    store.trackBank.channelCount().markInterested();
    store.trackBank.setChannelScrollStepSize(8);
    store.trackBank.followCursorTrack(store.cursorTrack);

    // popupBrowser
    store.popupBrowser = host.createPopupBrowser();

    // sceneBank
    store.sceneBank = host.createSceneBank(16);
    store.sceneBank.subscribe();

    // actions
    store.createScene = store.application.getAction('Create Scene');

    // masterTrack
    store.masterTrack = host.createMasterTrack(0);
    store.masterTrack.exists().markInterested();
});

export default store;
