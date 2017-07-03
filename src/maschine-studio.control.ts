import 'taktil/env'; // must be first line in entry file

import controls from './controls';
import { BaseView, SceneView, PatternView, PadMidiView, NavigateView } from './views';

// define controller script
host.defineController(
    'Native Instruments', // vendor
    'Maschine Studio', // name
    '1.0.0', // version
    '2e6cf580-327b-409b-b87a-19f18643c43b', // uuid
    'Joseph Larson', // author
);

// setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(
    ['Maschine Studio Virtual Input'],
    ['Maschine Studio Virtual Output'],
);

session.on('init', () => {
    session.views = [BaseView, SceneView, PatternView, PadMidiView, NavigateView];
    session.activateView(PatternView);
});
