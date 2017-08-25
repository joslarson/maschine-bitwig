// 1. set bitwig api version
loadAPI(3); // must come before env import

// 2. setup taktil env
import 'taktil/env'; // must be first import in entry file

import { controls } from './controls';
import { views } from './views';

// 3. define controller script
host.defineController(
    'Native Instruments', // vendor
    'Maschine Studio', // name
    '1.0.0', // version
    '2e6cf580-327b-409b-b87a-19f18643c43b', // uuid
    'Joseph Larson' // author
);

// 4. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(
    ['Maschine Studio Virtual Input'],
    ['Maschine Studio Virtual Output']
);

// 5. register controls to the session
session.registerControls(controls);

// 6. register views to the session
session.registerViews(views);

// 7. on init, activate view to trigger initial render
session.on('init', () => session.activateView('BASE'));
