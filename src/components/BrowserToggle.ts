import { Button } from 'taktil';

interface Params {
    cursorTrack: API.CursorTrack;
    popupBrowser: API.PopupBrowser;
}

export class BrowserToggle extends Button<Params> {
    onInit() {
        this.params.popupBrowser.exists().addValueObserver(browserExists => {
            this.setState({ on: browserExists });
        });
    }

    onPress() {
        const { popupBrowser, cursorTrack } = this.params;
        if (popupBrowser.exists().get()) {
            popupBrowser.cancel();
        } else {
            cursorTrack.browseToInsertAtEndOfChain();
        }
    }
}
