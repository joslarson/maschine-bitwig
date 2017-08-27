import { Button, View } from 'taktil';

export class ViewToggle extends Button<{ view: string }> {
    getView() {
        return session.views[this.params.view];
    }

    onInit() {
        session.on('activateView', (view: typeof View) => {
            this.setState({ on: view === this.getView() });
        });
    }

    onPress() {
        let view = this.getView();
        const parent = view.parent;
        if (session.activeView === view && parent) {
            session.activateView(parent.viewName);
        } else {
            session.activateView(view.viewName);
        }
    }
}

export class ModeGate extends Button<{ mode: string }> {
    onPress() {
        this.setState({ on: true });
        session.activateMode(this.params.mode);
    }

    onRelease() {
        this.setState({ on: false });
        session.deactivateMode(this.params.mode);
    }
}
