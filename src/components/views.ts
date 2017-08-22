import { Button, View } from 'taktil';

export class ViewToggle extends Button<{ view: typeof View | string }> {
    getView() {
        let view = this.options.view;
        if (typeof view === 'string') view = session.getView(view);
        return view;
    }

    onInit() {
        session.on('activateView', (view: typeof View) => {
            this.setState({ on: view === this.getView() });
        });
    }

    onPress() {
        let view = this.options.view;
        if (typeof view === 'string') view = session.getView(view);
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
