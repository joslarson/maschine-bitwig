import taktil from 'taktil';

interface Params {
    application: API.Application;
    sceneBank: API.SceneBank;
    index: number;
}

interface State {
    on: boolean;
    color: taktil.Color;
    exists: boolean;
    empty: boolean;
}

export class SceneButton extends taktil.Button<Params, State> {
    state: State = { on: false, exists: false, empty: true, color: { r: 0.5, g: 0, b: 1 } };
    scene: API.Scene;

    getControlOutput() {
        const { on, empty, color } = this.state;
        return { value: on ? 1 : 0, disabled: empty, color: color };
    }

    onInit() {
        this.scene = this.params.sceneBank.getScene(this.params.index);

        this.scene.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ on: isSelected });
        });

        this.scene.exists().addValueObserver(sceneExists => {
            this.setState({ exists: sceneExists });
        });

        this.scene.clipCount().addValueObserver(clipCount => {
            this.setState({ empty: clipCount === 0 });
        });
    }

    onPress() {
        if (!taktil.modeIsActive('SELECT')) {
            if (!this.scene.exists().get()) {
                for (let i = 0; i <= this.params.index; i++) {
                    if (
                        !this.params.sceneBank
                            .getScene(i)
                            .exists()
                            .get()
                    )
                        this.params.application.getAction('Create Scene').invoke();
                }
            } else {
                this.scene.launch();
            }
        }
        this.scene.selectInEditor();
    }
}
