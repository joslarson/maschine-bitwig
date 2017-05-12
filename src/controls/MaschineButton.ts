import { SimpleControl } from 'taktil';


export default class MaschineButton extends SimpleControl {
    cacheOnMidiIn = false;
    state = { value: 0 };
}
