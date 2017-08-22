import { Button } from 'taktil';

interface Options {
    popupBrowser: API.PopupBrowser;
}

export class BrowserExitButton extends Button<Options> {
    onPress() {
        const { popupBrowser } = this.options;
        if (popupBrowser.exists().get()) popupBrowser.cancel();
    }
}
