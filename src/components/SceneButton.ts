import { Button, SimpleControl, Color } from 'taktil';

interface Options {
    application: API.Application;
    sceneBank: API.SceneBank;
    index: number;
}

interface State {
    on: boolean;
    color: Color;
    exists: boolean;
    empty: boolean;
}

export class SceneButton extends Button<Options, State> {
    state: State = { on: false, exists: false, empty: true, color: { r: 0.5, g: 0, b: 1 } };
    scene: API.Scene;

    getOutput() {
        const { on, empty, color } = this.state;
        return { value: on ? 1 : 0, disabled: empty, color: color };
    }

    onInit() {
        this.scene = this.options.sceneBank.getScene(this.options.index);

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
        if (!session.modeIsActive('SELECT')) {
            if (!this.scene.exists().get()) {
                for (let i = 0; i <= this.options.index; i++) {
                    if (!this.options.sceneBank.getScene(i).exists().get())
                        this.options.application.getAction('Create Scene').invoke();
                }
            } else {
                this.scene.launch();
            }
        }
        this.scene.selectInEditor();
    }
}
