// 1. inject taktil env
import 'taktil/env'; // must be first import in entry file

import { controls } from './controls';
import { views } from './views';

// 2. set bitwig api version
host.loadAPI(3);

// 3. define controller script
host.defineController(
    'Native Instruments', // vendor
    'Maschine Mikro', // name
    '1.0.0', // version
    'f7f89e66-e5e4-40d6-a819-661e99ea571b', // uuid
    'Joseph Larson' // author
);

// 4. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(['Maschine Mikro Input'], ['Maschine Mikro Output']);

// 5. register controls to the session
session.registerControls(controls);

// 6. register views to the session
session.registerViews(views);

// 7. on init, activate view to trigger initial render
session.on('init', () => session.activateView('BASE'));
