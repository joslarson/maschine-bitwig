import { ViewStack } from 'taktil';

import { BaseView } from './BaseView';
import { SceneView } from './SceneView';
import { PatternView } from './PatternView';
import { PadMidiView } from './PadMidiView';
import { NavigateView } from './NavigateView';

export const views = {
    BASE: BaseView,
    SCENE: ViewStack(SceneView, BaseView),
    PATTERN: ViewStack(PatternView, BaseView),
    PAD_MIDI: ViewStack(PadMidiView, BaseView),
    NAVIGATE: ViewStack(NavigateView, BaseView),
};
