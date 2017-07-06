// 1. setup taktil env (must be first import in entry file)
import 'taktil/env';

import store from './store';
import { BaseView, SceneView, PatternView, PadMidiView, NavigateView } from './views';

// 2. define controller script
host.defineController(
    'Native Instruments', // vendor
    'Maschine Studio', // name
    '1.0.0', // version
    '2e6cf580-327b-409b-b87a-19f18643c43b', // uuid
    'Joseph Larson', // author
);

// 3. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(
    ['Maschine Studio Virtual Input'],
    ['Maschine Studio Virtual Output'],
);

// 4. register views to the session, activate initial view to trigger initial render
session.on('init', () => {
    session.registerViews(BaseView, SceneView, PatternView, PadMidiView, NavigateView);
    session.activateView('PatternView');
});