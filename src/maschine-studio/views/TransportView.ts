import { View } from 'taktil';

import {
    ArmToggle,
    LoopToggle,
    MetronomeToggle,
    PlayToggle,
    PreRollToggle,
    RestartButton,
} from '../../components/transport';
import { ModeButton } from '../../components/ModeButton';

import { controls } from '../controls';
import { daw } from '../../daw';

export class TransportView extends View {
    // Transport
    restartButton = new RestartButton(controls.RESTART, { transport: daw.transport });
    loopToggle = new LoopToggle(controls.RESTART, {
        mode: 'SHIFT',
        transport: daw.transport,
    });
    metronomeToggle = new MetronomeToggle(controls.METRO, {
        transport: daw.transport,
    });
    shiftButton = new ModeButton(controls.GRID, { targetMode: 'SHIFT' });
    playToggle = new PlayToggle(controls.PLAY, { transport: daw.transport });
    armToggle = new ArmToggle(controls.REC, { track: daw.cursorTrack });
    preRollToggle = new PreRollToggle(controls.REC, {
        mode: 'SHIFT',
        transport: daw.transport,
    });
}
