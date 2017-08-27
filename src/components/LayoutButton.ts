import { Button } from 'taktil';

interface Params {
    application: API.Application;
    layout: 'ARRANGE' | 'MIX' | 'EDIT';
}

export class LayoutButton extends Button<Params> {
    onInit() {
        this.params.application.panelLayout().addValueObserver((layout: string) => {
            this.setState({ ...this.state, on: layout === this.params.layout });
        });
    }

    onPress() {
        this.params.application.setPanelLayout(this.params.layout);
    }
}
