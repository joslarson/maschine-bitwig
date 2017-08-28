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
        const parent = view.parent;
        if (taktil.getActiveView() === view && parent) {
            taktil.activateView(parent.viewName);
        } else {
            taktil.activateView(view.viewName);
        }
    }
}

export class ModeGate extends taktil.Button<{ mode: string }> {
    onPress() {
        this.setState({ on: true });
        taktil.activateMode(this.params.mode);
    }

    onRelease() {
        this.setState({ on: false });
        taktil.deactivateMode(this.params.mode);
    }
}
