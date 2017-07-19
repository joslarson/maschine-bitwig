import { Button, SimpleControl, Color } from 'taktil';

import store from '../store';

type Props = { index: number };

interface State {
    on: boolean;
    color: Color;
    exists: boolean;
    empty: boolean;
}

export default class SceneButton extends Button<Props, State> {
    state: State = { on: false, exists: false, empty: true, color: { r: 0.5, g: 0, b: 1 } };
    scene: API.Scene;

    getOutput(control: SimpleControl) {
        const { on, empty, color } = this.state;
        return { value: on ? 1 : 0, disabled: empty, color: color };
    }

    onInit() {
        this.scene = store.sceneBank.getScene(this.props.index);

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
                for (let i = 0; i <= this.props.index; i++) {
                    if (!store.sceneBank.getScene(i).exists().get()) store.createScene.invoke();
                }
            } else {
                this.scene.launch();
            }
        }
        this.scene.selectInEditor();
    }
}
