import taktil from 'taktil';

export class BrowseWheel extends taktil.Component<{ popupBrowser: API.PopupBrowser }> {
    onInit() {
        taktil.on('activateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: true });
        });
        taktil.on('deactivateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: false });
        });
    }

    onControlInput({ value }: taktil.ControlState) {
        const { popupBrowser } = this.params;
        value > 0 ? popupBrowser.selectNextFile() : popupBrowser.selectPreviousFile();
    }

    getControlOutput() {
        return {};
    }
}
