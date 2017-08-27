import { Button } from 'taktil';

interface Params {
    popupBrowser: API.PopupBrowser;
}

export class BrowserExitButton extends Button<Params> {
    onPress() {
        const { popupBrowser } = this.params;
        if (popupBrowser.exists().get()) popupBrowser.cancel();
    }
}
