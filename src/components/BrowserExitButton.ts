import taktil from 'taktil';

interface Params {
    popupBrowser: API.PopupBrowser;
}

export class BrowserExitButton extends taktil.Button<Params> {
    onPress() {
        const { popupBrowser } = this.params;
        if (popupBrowser.exists().get()) popupBrowser.cancel();
    }
}
