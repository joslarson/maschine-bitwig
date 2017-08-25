import { BaseView } from './BaseView';
import { SceneView } from './SceneView';
import { PatternView } from './PatternView';
import { PadMidiView } from './PadMidiView';
import { NavigateView } from './NavigateView';

export const views = {
    BASE: BaseView,
    SCENE: SceneView,
    PATTERN: PatternView,
    PAD: PadMidiView,
    NAVIGATE: NavigateView,
};

export const views2 = {
    BASE: {
        view: BaseView,
        children: {
            SCENE: SceneView,
            PATTERN: PatternView,
            PAD: PadMidiView,
            NAVIGATE: NavigateView,
        },
    },
};
