import { ControlTemplate, Control, SimpleControl } from 'taktil';

import MaschineButton from './MaschineButton';
import MaschineColorButton from './MaschineColorButton';
import MaschinePanKnob from './MaschinePanKnob';

export default new ControlTemplate({
    // TOP LEFT
    CHANNEL: new MaschineButton({ status: 0xb0, data1: 0x15 }),
    PLUGIN: new MaschineButton({ status: 0xb0, data1: 0x16 }),
    ARRANGE: new MaschineButton({ status: 0xb0, data1: 0x17 }),
    MIX: new MaschineButton({ status: 0xb0, data1: 0x18 }),
    BROWSE: new MaschineButton({ status: 0xb0, data1: 0x19 }),
    SAMPLING: new MaschineButton({ status: 0xb0, data1: 0x1a }),
    ALL: new MaschineButton({ status: 0xb0, data1: 0x1b }),
    AUTO: new MaschineButton({ status: 0xb0, data1: 0x1c }),
    FS1: new MaschineButton({ status: 0xb0, data1: 0x1d }),
    FS2: new MaschineButton({ status: 0xb0, data1: 0x1e }),

    // METERS
    IN1: new MaschineButton({ status: 0xb1, data1: 0x15 }),
    IN2: new MaschineButton({ status: 0xb1, data1: 0x16 }),
    IN3: new MaschineButton({ status: 0xb1, data1: 0x17 }),
    IN4: new MaschineButton({ status: 0xb1, data1: 0x18 }),
    MST: new MaschineButton({ status: 0xb1, data1: 0x19 }),
    GRP: new MaschineButton({ status: 0xb1, data1: 0x1a }),
    SND: new MaschineButton({ status: 0xb1, data1: 0x1b }),
    CUE: new MaschineButton({ status: 0xb1, data1: 0x1c }),
    KNOB: new SimpleControl({ status: 0xb1, data1: 0x1d }),

    // PERFORMANCE
    TAP: new MaschineButton({ status: 0xb2, data1: 0x15 }),
    STEP_MODE: new MaschineButton({ status: 0xb2, data1: 0x16 }),
    MACRO: new MaschineButton({ status: 0xb2, data1: 0x17 }),
    NOTE_REPEAT: new MaschineButton({ status: 0xb2, data1: 0x18 }),

    // GROUPS
    GROUP_A: new MaschineColorButton({ status: 0xb3, data1: 0x66 }),
    GROUP_B: new MaschineColorButton({ status: 0xb3, data1: 0x67 }),
    GROUP_C: new MaschineColorButton({ status: 0xb3, data1: 0x68 }),
    GROUP_D: new MaschineColorButton({ status: 0xb3, data1: 0x69 }),
    GROUP_E: new MaschineColorButton({ status: 0xb3, data1: 0x6a }),
    GROUP_F: new MaschineColorButton({ status: 0xb3, data1: 0x6b }),
    GROUP_G: new MaschineColorButton({ status: 0xb3, data1: 0x6c }),
    GROUP_H: new MaschineColorButton({ status: 0xb3, data1: 0x6d }),

    // TRANSPORT
    RESTART: new MaschineButton({ status: 0xb4, data1: 0x15 }),
    METRO: new MaschineButton({ status: 0xb4, data1: 0x16 }),
    EVENTS: new MaschineButton({ status: 0xb4, data1: 0x17 }),
    GRID: new MaschineButton({ status: 0xb4, data1: 0x18 }),
    PLAY: new MaschineButton({ status: 0xb4, data1: 0x19 }),
    REC: new MaschineButton({ status: 0xb4, data1: 0x1a }),
    ERASE: new MaschineButton({ status: 0xb4, data1: 0x1b }),

    // MIDDLE
    SCENE: new MaschineButton({ status: 0xb5, data1: 0x15 }),
    PATTERN: new MaschineButton({ status: 0xb5, data1: 0x16 }),
    PAD_MODE: new MaschineButton({ status: 0xb5, data1: 0x17 }),
    NAVIGATE: new MaschineButton({ status: 0xb5, data1: 0x18 }),
    DUPLICATE: new MaschineButton({ status: 0xb5, data1: 0x19 }),
    SELECT: new MaschineButton({ status: 0xb5, data1: 0x1a }),
    SOLO: new MaschineButton({ status: 0xb5, data1: 0x1b }),
    MUTE: new MaschineButton({ status: 0xb5, data1: 0x1c }),

    // PADS
    PAD_1: new MaschineColorButton({ status: 0x95, data1: 0x24 }),
    PAD_2: new MaschineColorButton({ status: 0x95, data1: 0x25 }),
    PAD_3: new MaschineColorButton({ status: 0x95, data1: 0x26 }),
    PAD_4: new MaschineColorButton({ status: 0x95, data1: 0x27 }),
    PAD_5: new MaschineColorButton({ status: 0x95, data1: 0x28 }),
    PAD_6: new MaschineColorButton({ status: 0x95, data1: 0x29 }),
    PAD_7: new MaschineColorButton({ status: 0x95, data1: 0x2a }),
    PAD_8: new MaschineColorButton({ status: 0x95, data1: 0x2b }),
    PAD_9: new MaschineColorButton({ status: 0x95, data1: 0x2c }),
    PAD_10: new MaschineColorButton({ status: 0x95, data1: 0x2d }),
    PAD_11: new MaschineColorButton({ status: 0x95, data1: 0x2e }),
    PAD_12: new MaschineColorButton({ status: 0x95, data1: 0x2f }),
    PAD_13: new MaschineColorButton({ status: 0x95, data1: 0x30 }),
    PAD_14: new MaschineColorButton({ status: 0x95, data1: 0x31 }),
    PAD_15: new MaschineColorButton({ status: 0x95, data1: 0x32 }),
    PAD_16: new MaschineColorButton({ status: 0x95, data1: 0x33 }),

    // EDIT
    COPY: new MaschineButton({ status: 0xb6, data1: 0x15 }),
    PASTE: new MaschineButton({ status: 0xb6, data1: 0x16 }),
    NOTE: new MaschineButton({ status: 0xb6, data1: 0x17 }),
    NUDGE: new MaschineButton({ status: 0xb6, data1: 0x18 }),
    UNDO: new MaschineButton({ status: 0xb6, data1: 0x19 }),
    REDO: new MaschineButton({ status: 0xb6, data1: 0x1a }),
    QUANTIZE: new MaschineButton({ status: 0xb6, data1: 0x1b }),
    CLEAR: new MaschineButton({ status: 0xb6, data1: 0x1c }),
    JOG_DIAL: new MaschineButton({ status: 0xb6, data1: 0x1d }),
    JOG_RING: new MaschineButton({ status: 0xb6, data1: 0x1e }),
    BACK: new MaschineButton({ status: 0xb6, data1: 0x66 }),
    LEFT_ARROW: new MaschineButton({ status: 0xb6, data1: 0x67 }),
    RIGHT_ARROW: new MaschineButton({ status: 0xb6, data1: 0x68 }),
    ENTER: new MaschineButton({ status: 0xb6, data1: 0x69 }),

    // SCREENS
    ARM_A: new MaschineButton({ status: 0xb7, data1: 0x15 }),
    ARM_B: new MaschineButton({ status: 0xb7, data1: 0x16 }),
    ARM_C: new MaschineButton({ status: 0xb7, data1: 0x17 }),
    ARM_D: new MaschineButton({ status: 0xb7, data1: 0x18 }),
    ARM_E: new MaschineButton({ status: 0xb7, data1: 0x19 }),
    ARM_F: new MaschineButton({ status: 0xb7, data1: 0x1a }),
    ARM_G: new MaschineButton({ status: 0xb7, data1: 0x1b }),
    ARM_H: new MaschineButton({ status: 0xb7, data1: 0x1c }),

    PREV_DEVICE: new MaschineButton({ status: 0xb9, data1: 0x15 }),
    CHILD_DEVICE: new MaschineButton({ status: 0xb9, data1: 0x16 }),
    PARENT_DEVICE: new MaschineButton({ status: 0xb9, data1: 0x17 }),
    NEXT_DEVICE: new MaschineButton({ status: 0xb9, data1: 0x18 }),
    PREV_PARAM_BANK: new MaschineButton({ status: 0xb9, data1: 0x19 }),
    NEXT_PARAM_BANK: new MaschineButton({ status: 0xb9, data1: 0x1c }),

    VOL_TOUCH_A: new MaschineButton({ status: 0xb7, data1: 0x66 }),
    VOL_TOUCH_B: new MaschineButton({ status: 0xb7, data1: 0x68 }),
    VOL_TOUCH_C: new MaschineButton({ status: 0xb7, data1: 0x6a }),
    VOL_TOUCH_D: new MaschineButton({ status: 0xb7, data1: 0x6c }),
    VOL_TOUCH_E: new MaschineButton({ status: 0xb7, data1: 0x6e }),
    VOL_TOUCH_F: new MaschineButton({ status: 0xb7, data1: 0x70 }),
    VOL_TOUCH_G: new MaschineButton({ status: 0xb7, data1: 0x72 }),
    VOL_TOUCH_H: new MaschineButton({ status: 0xb7, data1: 0x74 }),

    VOL_A: new SimpleControl({ status: 0xb7, data1: 0x67 }),
    VOL_B: new SimpleControl({ status: 0xb7, data1: 0x69 }),
    VOL_C: new SimpleControl({ status: 0xb7, data1: 0x6b }),
    VOL_D: new SimpleControl({ status: 0xb7, data1: 0x6d }),
    VOL_E: new SimpleControl({ status: 0xb7, data1: 0x6f }),
    VOL_F: new SimpleControl({ status: 0xb7, data1: 0x71 }),
    VOL_G: new SimpleControl({ status: 0xb7, data1: 0x73 }),
    VOL_H: new SimpleControl({ status: 0xb7, data1: 0x75 }),

    PAN_TOUCH_A: new MaschineButton({ status: 0xb8, data1: 0x66 }),
    PAN_TOUCH_B: new MaschineButton({ status: 0xb8, data1: 0x68 }),
    PAN_TOUCH_C: new MaschineButton({ status: 0xb8, data1: 0x6a }),
    PAN_TOUCH_D: new MaschineButton({ status: 0xb8, data1: 0x6c }),
    PAN_TOUCH_E: new MaschineButton({ status: 0xb8, data1: 0x6e }),
    PAN_TOUCH_F: new MaschineButton({ status: 0xb8, data1: 0x70 }),
    PAN_TOUCH_G: new MaschineButton({ status: 0xb8, data1: 0x72 }),
    PAN_TOUCH_H: new MaschineButton({ status: 0xb8, data1: 0x74 }),

    PAN_A: new MaschinePanKnob({ status: 0xb8, data1: 0x67 }),
    PAN_B: new MaschinePanKnob({ status: 0xb8, data1: 0x69 }),
    PAN_C: new MaschinePanKnob({ status: 0xb8, data1: 0x6b }),
    PAN_D: new MaschinePanKnob({ status: 0xb8, data1: 0x6d }),
    PAN_E: new MaschinePanKnob({ status: 0xb8, data1: 0x6f }),
    PAN_F: new MaschinePanKnob({ status: 0xb8, data1: 0x71 }),
    PAN_G: new MaschinePanKnob({ status: 0xb8, data1: 0x73 }),
    PAN_H: new MaschinePanKnob({ status: 0xb8, data1: 0x75 }),

    // MACRO_TOUCH_1: new MaschineButton({ status: 0xB0, data1: 0x66 }),
    // MACRO_TOUCH_2: new MaschineButton({ status: 0xB0, data1: 0x68 }),
    // MACRO_TOUCH_3: new MaschineButton({ status: 0xB0, data1: 0x6A }),
    // MACRO_TOUCH_4: new MaschineButton({ status: 0xB0, data1: 0x6C }),
    // MACRO_TOUCH_5: new MaschineButton({ status: 0xB0, data1: 0x6E }),
    // MACRO_TOUCH_6: new MaschineButton({ status: 0xB0, data1: 0x70 }),
    // MACRO_TOUCH_7: new MaschineButton({ status: 0xB0, data1: 0x72 }),
    // MACRO_TOUCH_8: new MaschineButton({ status: 0xB0, data1: 0x74 }),

    // MACRO_1: new MaschineButton({ status: 0xB0, data1: 0x67 }),
    // MACRO_2: new MaschineButton({ status: 0xB0, data1: 0x69 }),
    // MACRO_3: new MaschineButton({ status: 0xB0, data1: 0x6B }),
    // MACRO_4: new MaschineButton({ status: 0xB0, data1: 0x6D }),
    // MACRO_5: new MaschineButton({ status: 0xB0, data1: 0x6F }),
    // MACRO_6: new MaschineButton({ status: 0xB0, data1: 0x71 }),
    // MACRO_7: new MaschineButton({ status: 0xB0, data1: 0x73 }),
    // MACRO_8: new MaschineButton({ status: 0xB0, data1: 0x75 }),

    PARAM_TOUCH_1: new MaschineButton({ status: 0xba, data1: 0x66 }),
    PARAM_TOUCH_2: new MaschineButton({ status: 0xba, data1: 0x68 }),
    PARAM_TOUCH_3: new MaschineButton({ status: 0xba, data1: 0x6a }),
    PARAM_TOUCH_4: new MaschineButton({ status: 0xba, data1: 0x6c }),
    PARAM_TOUCH_5: new MaschineButton({ status: 0xba, data1: 0x6e }),
    PARAM_TOUCH_6: new MaschineButton({ status: 0xba, data1: 0x70 }),
    PARAM_TOUCH_7: new MaschineButton({ status: 0xba, data1: 0x72 }),
    PARAM_TOUCH_8: new MaschineButton({ status: 0xba, data1: 0x74 }),

    PARAM_1: new MaschineButton({ status: 0xba, data1: 0x67 }),
    PARAM_2: new MaschineButton({ status: 0xba, data1: 0x69 }),
    PARAM_3: new MaschineButton({ status: 0xba, data1: 0x6b }),
    PARAM_4: new MaschineButton({ status: 0xba, data1: 0x6d }),
    PARAM_5: new MaschineButton({ status: 0xba, data1: 0x6f }),
    PARAM_6: new MaschineButton({ status: 0xba, data1: 0x71 }),
    PARAM_7: new MaschineButton({ status: 0xba, data1: 0x73 }),
    PARAM_8: new MaschineButton({ status: 0xba, data1: 0x75 }),
});
