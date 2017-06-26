import { Button } from 'taktil';

import store from 'store';

export default class BrowserToggle extends Button {
    onInit() {
        store.popupBrowser.exists().addValueObserver(browserExists => {
            this.setState({ on: browserExists });
        });
    }

    onPress() {
        if (store.popupBrowser.exists().get()) {
            store.popupBrowser.cancel();
        } else {
            store.cursorTrack.browseToInsertAtEndOfChain();
        }
    }
}
