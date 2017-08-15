import { Button } from 'taktil';

import store from '../store';

export default class LayoutButton extends Button<{ layout: 'ARRANGE' | 'MIX' | 'EDIT' }> {
    onInit() {
        store.application.panelLayout().addValueObserver((layout: string) => {
            this.setState({ ...this.state, on: layout === this.options.layout });
        });
    }

    onPress() {
        store.application.setPanelLayout(this.options.layout);
    }
}
