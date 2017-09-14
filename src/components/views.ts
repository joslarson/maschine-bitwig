import taktil from 'taktil';

export class ViewToggle extends taktil.Button<{ view: string }> {
    getView() {
        return taktil.getViews()[this.params.view];
    }

    onInit() {
        taktil.on('activateView', (view: typeof taktil.View) => {
            this.setState({ on: view === this.getView() });
        });
    }

    onPress() {
        let view = this.getView();
        const parent = view.extends[0];
        if (taktil.getActiveView() === view && parent) {
            taktil.activateView(parent.viewName);
        } else {
            taktil.activateView(view.viewName);
        }
    }
}

export class ModeGate extends taktil.Button<{ targetMode: string }> {
    onPress() {
        this.setState({ on: true });
        taktil.activateMode(this.params.targetMode);
    }

    onRelease() {
        this.setState({ on: false });
        taktil.deactivateMode(this.params.targetMode);
    }
}
