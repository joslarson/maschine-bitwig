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

// setup and Discover Midi Controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(
    ['Maschine Studio Virtual Input'],
    ['Maschine Studio Virtual Output'],
);

// init session
session.on('init', () => {
    // 1. set master controls map
    session.controls = controls;

    // 2. add views to session
    session.views = [BaseView, SceneView, PatternView, PadMidiView, NavigateView];

    // 3. set initial active view (triggers initial render of controls)
    session.activeView = PatternView;
});
