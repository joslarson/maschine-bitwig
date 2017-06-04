import { Button } from 'taktil';

import store from 'store';


export default class BrowserExitButton extends Button {
    onPress() {
        if (store.popupBrowser.exists().get()) store.popupBrowser.cancel();
    }
}
