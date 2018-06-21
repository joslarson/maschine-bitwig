import '../polyfills';

import taktil from 'taktil';

import { controls } from './controls';
import { views } from './views';

// 1. set bitwig api version
host.loadAPI(3);

// 2. define controller script
host.defineController(
    'Native Instruments', // vendor
    'Maschine MK2', // name
    '1.0.0', // version
    'b01c7c30-727f-11e8-a417-5915438e6398', // uuid
    'Joseph Larson' // author
);

// 3. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(
    ['Maschine MK2 Virtual Input'],
    ['Maschine MK2 Virtual Output']
);

// 4. register controls to the session
taktil.registerControls(controls);

// 5. register views to the session
taktil.registerViews(views);

// 6. on init, activate view to trigger initial render
taktil.on('init', () => taktil.activateView('BASE'));
