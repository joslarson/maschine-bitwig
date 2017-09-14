import { View } from 'taktil';

import { TrackBankNavigationButton } from '../../components/TrackBankNavigationButton';
import { TrackButton } from '../../components/TrackButton';

import { controls } from '../controls';
import { daw } from '../../daw';

export class GroupsView extends View {
    // Groups
    trackButtons = [
        controls.GROUP_A,
        controls.GROUP_B,
        controls.GROUP_C,
        controls.GROUP_D,
        controls.GROUP_E,
        controls.GROUP_F,
        controls.GROUP_G,
        controls.GROUP_H,
    ].map(
        (control, index) =>
            new TrackButton(control, {
                application: daw.application,
                transport: daw.transport,
                trackBank: daw.trackBank,
                index,
            })
    );

    trackNavButtons = [
        controls.GROUP_A,
        controls.GROUP_B,
        controls.GROUP_C,
        controls.GROUP_D,
        controls.GROUP_E,
        controls.GROUP_F,
        controls.GROUP_G,
        controls.GROUP_H,
    ].map(
        (control, index) =>
            new TrackBankNavigationButton(control, {
                index,
                mode: 'SHIFT',
                trackBank: daw.trackBank,
            })
    );
}
