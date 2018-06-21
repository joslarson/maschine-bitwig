import taktil from 'taktil';

export class ViewToggle extends taktil.Button<{ onView: string; offView: string }> {
    onInit() {
        taktil.on('activateView', (view: string) => {
            this.setState({ on: view === this.params.onView });
        });
    }

    onPress() {
        let view = this.params.onView;
        if (taktil.getActiveView() === view) {
            taktil.activateView(this.params.offView);
        } else {
            taktil.activateView(this.params.onView);
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
