import { Button } from 'taktil';

interface Options {
    cursorTrack: API.CursorTrack;
    popupBrowser: API.PopupBrowser;
}

export class BrowserToggle extends Button<Options> {
    onInit() {
        this.options.popupBrowser.exists().addValueObserver(browserExists => {
            this.setState({ on: browserExists });
        });
    }

    onPress() {
        const { popupBrowser, cursorTrack } = this.options;
        if (popupBrowser.exists().get()) {
            popupBrowser.cancel();
        } else {
            cursorTrack.browseToInsertAtEndOfChain();
        }
    }
}
