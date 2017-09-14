import { ViewStack } from 'taktil';
import { BaseView } from './BaseView';

import { ClipSlotButton } from 'components/ClipSlotButton';

import { controls } from '../controls';
import { daw } from '../../daw';

export class PatternView extends ViewStack(BaseView) {
    clipSlotButtons = [
        controls.PAD_1,
        controls.PAD_2,
        controls.PAD_3,
        controls.PAD_4,
        controls.PAD_5,
        controls.PAD_6,
        controls.PAD_7,
        controls.PAD_8,
        controls.PAD_9,
        controls.PAD_10,
        controls.PAD_11,
        controls.PAD_12,
        controls.PAD_13,
        controls.PAD_14,
        controls.PAD_15,
        controls.PAD_16,
    ].map(
        (control, index) =>
            new ClipSlotButton(control, {
                index,
                application: daw.application,
                cursorTrack: daw.cursorTrack,
                sceneBank: daw.sceneBank,
            })
    );
}
