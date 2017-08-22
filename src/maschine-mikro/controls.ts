import { ControlTemplate, SimpleControl } from 'taktil';

import { MaschineButton } from 'controls/MaschineButton';
import { MaschinePanKnob } from 'controls/MaschinePanKnob';

export const controls = new ControlTemplate({
    // MISC
    ENTER: new MaschineButton({ status: 0xb0, data1: 0x5d }),

    // TRANSPORT
    PLAY: new MaschineButton({ status: 0xb0, data1: 0x6c }),
    REC: new MaschineButton({ status: 0xb0, data1: 0x6d }),
    ERASE: new MaschineButton({ status: 0xb0, data1: 0x6e }),
    RESTART: new MaschineButton({ status: 0xb0, data1: 0x68 }),
    LEFT: new MaschineButton({ status: 0xb0, data1: 0x69 }),
    RIGHT: new MaschineButton({ status: 0xb0, data1: 0x6a }),
    GRID: new MaschineButton({ status: 0xb0, data1: 0x6b }),
    BROWSE: new MaschineButton({ status: 0xb0, data1: 0x57 }),
    SAMPLING: new MaschineButton({ status: 0xb0, data1: 0x58 }),
    GROUP: new MaschineButton({ status: 0xb0, data1: 0x56 }),
    NOTE_REPEAT: new MaschineButton({ status: 0xb0, data1: 0x6f }),

    // MIDDLE
    SCENE: new MaschineButton({ status: 0xb0, data1: 0x70 }),
    PATTERN: new MaschineButton({ status: 0xb0, data1: 0x71 }),
    PAD_MODE: new MaschineButton({ status: 0xb0, data1: 0x72 }),
    NAVIGATE: new MaschineButton({ status: 0xb0, data1: 0x73 }),
    DUPLICATE: new MaschineButton({ status: 0xb0, data1: 0x74 }),
    SELECT: new MaschineButton({ status: 0xb0, data1: 0x75 }),
    SOLO: new MaschineButton({ status: 0xb0, data1: 0x76 }),
    MUTE: new MaschineButton({ status: 0xb0, data1: 0x77 }),

    // PADS
    PAD_1: new MaschineButton({ status: 0x95, data1: 0x24 }),
    PAD_2: new MaschineButton({ status: 0x95, data1: 0x25 }),
    PAD_3: new MaschineButton({ status: 0x95, data1: 0x26 }),
    PAD_4: new MaschineButton({ status: 0x95, data1: 0x27 }),
    PAD_5: new MaschineButton({ status: 0x95, data1: 0x28 }),
    PAD_6: new MaschineButton({ status: 0x95, data1: 0x29 }),
    PAD_7: new MaschineButton({ status: 0x95, data1: 0x2a }),
    PAD_8: new MaschineButton({ status: 0x95, data1: 0x2b }),
    PAD_9: new MaschineButton({ status: 0x95, data1: 0x2c }),
    PAD_10: new MaschineButton({ status: 0x95, data1: 0x2d }),
    PAD_11: new MaschineButton({ status: 0x95, data1: 0x2e }),
    PAD_12: new MaschineButton({ status: 0x95, data1: 0x2f }),
    PAD_13: new MaschineButton({ status: 0x95, data1: 0x30 }),
    PAD_14: new MaschineButton({ status: 0x95, data1: 0x31 }),
    PAD_15: new MaschineButton({ status: 0x95, data1: 0x32 }),
    PAD_16: new MaschineButton({ status: 0x95, data1: 0x33 }),
});
