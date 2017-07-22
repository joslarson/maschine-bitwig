// 1. setup taktil env (must be first import in entry file)
import 'taktil/env';

import { BaseView, SceneView, PatternView, PadMidiView, NavigateView } from './views';

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

// 4. register views to the session
session.registerViews(BaseView, SceneView, PatternView, PadMidiView, NavigateView);

// 5. on init, activate view to trigger initial render
session.on('init', () => session.activateView(PatternView));
