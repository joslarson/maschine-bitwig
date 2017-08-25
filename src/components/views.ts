import { Button, View } from 'taktil';

export class ViewToggle extends Button<{ view: string }> {
    getView() {
        return session.views[this.options.view];
    }

    onInit() {
        session.on('activateView', (view: typeof View) => {
            this.setState({ on: view === this.getView() });
        });
    }

    onPress() {
        let view = this.getView();
        const parent = view.getParent();
        if (session.activeView === view && parent) {
            session.activateView(parent);
        } else {
            session.activateView(view);
        }
    }
}

export class ModeGate extends Button<{ mode: string }> {
    onPress() {
        this.setState({ on: true });
        session.activateMode(this.options.mode);
    }

    onRelease() {
        this.setState({ on: false });
        session.deactivateMode(this.options.mode);
    }
}
