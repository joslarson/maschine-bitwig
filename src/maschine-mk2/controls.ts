// import taktil from 'taktil';

import { MaschineButton } from '../controls/MaschineButton';
import { MaschineColorButton } from '../controls/MaschineColorButton';
// import { MaschinePanKnob } from '../controls/MaschinePanKnob';
import { RelativeKnob } from '../controls/RelativeKnob';

export const controls = {
    // TOP LEFT
    CONTROL: new MaschineButton({ status: 0xbf, data1: 0x55 }),
    STEP: new MaschineButton({ status: 0xbf, data1: 0x56 }),
    BROWSE: new MaschineButton({ status: 0xbf, data1: 0x57 }),
    SAMPLING: new MaschineButton({ status: 0xbf, data1: 0x58 }),
    ALL: new MaschineButton({ status: 0xbf, data1: 0x59 }),
    AUTO: new MaschineButton({ status: 0xbf, data1: 0x5a }),

    // MASTER
    VOLUME: new MaschineButton({ status: 0xbf, data1: 0x07 }),
    SWING: new MaschineButton({ status: 0xbf, data1: 0x09 }),
    TEMPO: new MaschineButton({ status: 0xbf, data1: 0x03 }),
    KNOB_TURN: new RelativeKnob({ channel: 0xbf, control: 0x65 }),
    KNOB_PUSH: new MaschineButton({ status: 0xbf, data1: 0x66 }),
    LEFT_ARROW: new MaschineButton({ status: 0xbf, data1: 0x62 }),
    RIGHT_ARROW: new MaschineButton({ status: 0xbf, data1: 0x63 }),
    ENTER: new MaschineButton({ status: 0xbf, data1: 0x64 }),
    NOTE_REPEAT: new MaschineButton({ status: 0xbf, data1: 0x6f }),

    // GROUPS
    GROUP_A: new MaschineColorButton({ status: 0xbf, data1: 0x50 }),
    GROUP_B: new MaschineColorButton({ status: 0xbf, data1: 0x51 }),
    GROUP_C: new MaschineColorButton({ status: 0xbf, data1: 0x52 }),
    GROUP_D: new MaschineColorButton({ status: 0xbf, data1: 0x53 }),
    GROUP_E: new MaschineColorButton({ status: 0xbf, data1: 0x5b }),
    GROUP_F: new MaschineColorButton({ status: 0xbf, data1: 0x5c }),
    GROUP_G: new MaschineColorButton({ status: 0xbf, data1: 0x5d }),
    GROUP_H: new MaschineColorButton({ status: 0xbf, data1: 0x5e }),

    // TRANSPORT
    RESTART: new MaschineButton({ status: 0xbf, data1: 0x68 }),
    STEP_LEFT: new MaschineButton({ status: 0xbf, data1: 0x69 }),
    STEP_RIGHT: new MaschineButton({ status: 0xbf, data1: 0x6a }),
    GRID: new MaschineButton({ status: 0xbf, data1: 0x6b }),
    PLAY: new MaschineButton({ status: 0xbf, data1: 0x6c }),
    REC: new MaschineButton({ status: 0xbf, data1: 0x6d }),
    ERASE: new MaschineButton({ status: 0xbf, data1: 0x6e }),

    // MIDDLE
    SCENE: new MaschineButton({ status: 0xbf, data1: 0x70 }),
    PATTERN: new MaschineButton({ status: 0xbf, data1: 0x71 }),
    PAD_MODE: new MaschineButton({ status: 0xbf, data1: 0x72 }),
    NAVIGATE: new MaschineButton({ status: 0xbf, data1: 0x73 }),
    DUPLICATE: new MaschineButton({ status: 0xbf, data1: 0x74 }),
    SELECT: new MaschineButton({ status: 0xbf, data1: 0x75 }),
    SOLO: new MaschineButton({ status: 0xbf, data1: 0x76 }),
    MUTE: new MaschineButton({ status: 0xbf, data1: 0x77 }),

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
};
