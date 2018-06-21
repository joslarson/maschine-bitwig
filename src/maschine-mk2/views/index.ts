import { ViewStack } from 'taktil';
import { BaseView } from './BaseView';
import { PatternView } from './PatternView';
import { SceneView } from './SceneView';

export const views = {
    BASE: BaseView,
    SCENE: ViewStack(SceneView, BaseView),
    PATTERN: ViewStack(PatternView, BaseView),
};
