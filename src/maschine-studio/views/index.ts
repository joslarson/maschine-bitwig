import { BaseView } from './BaseView';
import { SceneView } from './SceneView';
import { PatternView } from './PatternView';
import { PadMidiView } from './PadMidiView';
import { NavigateView } from './NavigateView';
import { TransportView } from './TransportView';
import { GroupsView } from './GroupsView';

export const views = {
    TRANSPORT: TransportView,
    GROUPS: GroupsView,
    BASE: BaseView,
    SCENE: SceneView,
    PATTERN: PatternView,
    PAD_MIDI: PadMidiView,
    NAVIGATE: NavigateView,
};
