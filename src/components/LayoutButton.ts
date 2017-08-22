import { Button } from 'taktil';

interface Options {
    application: API.Application;
    layout: 'ARRANGE' | 'MIX' | 'EDIT';
}

export class LayoutButton extends Button<Options> {
    onInit() {
        this.options.application.panelLayout().addValueObserver((layout: string) => {
            this.setState({ ...this.state, on: layout === this.options.layout });
        });
    }

    onPress() {
        this.options.application.setPanelLayout(this.options.layout);
    }
}
