import { View } from 'taktil';

import BaseView from './BaseView';
import controls from '../template';
import * as components from 'components';

export default class PatternView extends View {
    static parent = BaseView;

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
    ].map((control, index) => new components.ClipSlotButton(control, { index }));
}
