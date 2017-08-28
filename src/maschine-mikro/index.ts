import taktil from 'taktil';

import { controls } from './controls';
import { views } from './views';

// 1. set bitwig api version
host.loadAPI(3);

// 2. define controller script
host.defineController(
    'Native Instruments', // vendor
    'Maschine Mikro', // name
    '1.0.0', // version
    'f7f89e66-e5e4-40d6-a819-661e99ea571b', // uuid
    'Joseph Larson' // author
);

// 3. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(['Maschine Mikro Input'], ['Maschine Mikro Output']);

// 4. register controls to the session
taktil.registerControls(controls);

// 5. register views to the session
taktil.registerViews(views);

// 6. on init, activate view to trigger initial render
taktil.on('init', () => taktil.activateView('BASE'));
