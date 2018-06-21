export function rgb2hsb({ r, g, b }: { r: number; g: number; b: number }) {
    const result: { h: number; s: number; b: number } = { h: 0, s: 0, b: 0 };

    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    const delta = maxVal - minVal;

    result.b = maxVal;

    if (delta == 0) {
        result.h = 0;
        result.s = 0;
    } else {
        result.s = delta / maxVal;
        let del_R = ((maxVal - r) / 6 + delta / 2) / delta;
        let del_G = ((maxVal - g) / 6 + delta / 2) / delta;
        let del_B = ((maxVal - b) / 6 + delta / 2) / delta;

        if (r == maxVal) {
            result.h = del_B - del_G;
        } else if (g == maxVal) {
            result.h = 1 / 3 + del_R - del_B;
        } else if (b == maxVal) {
            result.h = 2 / 3 + del_G - del_R;
        }

        if (result.h < 0) {
            result.h += 1;
        }
        if (result.h > 1) {
            result.h -= 1;
        }
    }

    result.h = Math.round(result.h * 360);
    result.s = Math.round(result.s * 1);
    result.b = Math.round(result.b * 1);

    result.h = Math.floor((result.h * 127.0) / 360.0);
    result.s = Math.floor((1 - Math.pow(1 - result.s, 2)) * 127.0);
    // result.s = Math.floor(result.s * 127.0);
    result.b = Math.floor(result.b * 127.0);

    return result;
}

export function rgb2hsv({ r, g, b }: { r: number; g: number; b: number }) {
    let rr,
        gg,
        bb,
        h,
        s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = 1 / 3 + rr - bb;
        } else if (b === v) {
            h = 2 / 3 + gg - rr;
        }

        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }

    return {
        // h: Math.round(h * 127),
        h: getOffsetHue(Math.round(h * 127), 0),
        s: Math.round(s * 127),
        v: Math.round(v * 127),
    };
}

function getOffsetHue(hue, offset) {
    offset = offset > 127 ? offset % 127 : offset < -127 ? offset % -127 : offset;
    if (offset >= 0) {
        return hue + offset <= 127 ? hue + offset : hue + offset - 127;
    } else {
        return hue + offset >= 0 ? hue + offset : hue + offset + 127;
    }
}

export class SyncedInterval {
    static MIN_BPM = 20;
    static MAX_BPM = 666;
    static CODE_LAG = 35;

    transport: API.Transport;
    callback: Function;
    beats: number;
    cancelled = false;
    target: number | null = null;
    isOddInterval = true;

    constructor(transport: API.Transport, callback: (...args: any[]) => void, beats: number) {
        this.transport = transport;
        this.callback = callback;
        this.beats = beats;
    }

    start() {
        const { transport } = this;
        const startTime = new Date().getTime();
        const position = transport ? transport.getPosition().get() : 1;
        const isPlaying = transport ? transport.isPlaying().get() : false;

        const bpm = transport
            ? transport.tempo().get() * (SyncedInterval.MAX_BPM - SyncedInterval.MIN_BPM) +
              SyncedInterval.MIN_BPM
            : 120;
        const beatLength = 60000 / bpm;

        let delay = this.beats * beatLength - SyncedInterval.CODE_LAG;

        if (this.target === null && isPlaying) {
            const remainder = position % this.beats;
            const beatsUntilNextMark = this.beats - remainder;
            this.target = position + beatsUntilNextMark;
            this.isOddInterval = true;
        }

        if (isPlaying && this.target !== null) {
            delay = (this.target - position) * beatLength * this.beats - SyncedInterval.CODE_LAG;
        } else {
            this.target = null;
        }

        host.scheduleTask(() => {
            if (!this.cancelled && this.target !== null) {
                this.isOddInterval = !this.isOddInterval;
                const isOddInterval = isPlaying
                    ? this.target % (this.beats * 2) !== 0
                    : this.isOddInterval;
                this.callback(isOddInterval);
                // update codeLag
                const endTime = new Date().getTime();
                SyncedInterval.CODE_LAG =
                    (endTime - (startTime + delay) + SyncedInterval.CODE_LAG * 29) / 30;
                if (this.target !== null) this.target = this.target + this.beats;
                this.start(); // repeat
            }
        }, delay);
        return this;
    }

    cancel() {
        this.cancelled = true;
        return this;
    }
}

// prettier-ignore
export const RGB_COLORS: { r: number, g: number, b: number }[] = [
    // { r: 0.3294117748737335 , g: 0.3294117748737335 , b: 0.3294117748737335  }, // Dark Gray
    // { r: 0.47843137383461   , g: 0.47843137383461   , b: 0.47843137383461    }, // Gray
    // { r: 0.7882353067398071 , g: 0.7882353067398071 , b: 0.7882353067398071  }, // Light Gray
    // { r: 0.5254902243614197 , g: 0.5372549295425415 , b: 0.6745098233222961  }, // Silver
    { r: 0.6392157077789307 , g: 0.4745098054409027 , b: 0.26274511218070984 }, // Dark Brown
    { r: 0.7764706015586853 , g: 0.6235294342041016 , b: 0.43921568989753723 }, // Brown
    { r: 0.34117648005485535, g: 0.3803921639919281 , b: 0.7764706015586853  }, // Dark Blue
    { r: 0.5176470875740051 , g: 0.5411764979362488 , b: 0.8784313797950745  }, // Purplish Blue
    { r: 0.5843137502670288 , g: 0.2862745225429535 , b: 0.7960784435272217  }, // Purple
    { r: 0.8509804010391235 , g: 0.21960784494876862, b: 0.4431372582912445  }, // Pink
    { r: 0.8509804010391235 , g: 0.18039216101169586, b: 0.1411764770746231  }, // Red
    { r: 1                  , g: 0.34117648005485535, b: 0.0235294122248888  }, // Orange
    { r: 0.8509804010391235 , g: 0.615686297416687  , b: 0.062745101749897   }, // Light Orange
    { r: 0.45098039507865906, g: 0.5960784554481506 , b: 0.0784313753247261  }, // Green
    { r: 0                  , g: 0.615686297416687  , b: 0.27843138575553894 }, // Cold Green
    { r: 0                  , g: 0.6509804129600525 , b: 0.5803921818733215  }, // Bluish Green
    { r: 0                  , g: 0.6000000238418579 , b: 0.8509804010391235  }, // Blue
    { r: 0.7372549176216125 , g: 0.4627451002597809 , b: 0.9411764740943909  }, // Light Purple
    { r: 0.8823529481887817 , g: 0.4000000059604645 , b: 0.5686274766921997  }, // Light Pink
    { r: 0.9254902005195618 , g: 0.3803921639919281 , b: 0.34117648005485535 }, // Skin
    { r: 1                  , g: 0.5137255191802979 , b: 0.24313725531101227 }, // Redish Brown
    { r: 0.8941176533699036 , g: 0.7176470756530762 , b: 0.30588236451148987 }, // Light Brown
    { r: 0.6274510025978088 , g: 0.7529411911964417 , b: 0.2980392277240753  }, // Light Green
    { r: 0.24313725531101227, g: 0.7333333492279053 , b: 0.3843137323856354  }, // Grass Green
    { r: 0.26274511218070984, g: 0.8235294222831726 , b: 0.7254902124404907  }, // Light Blue
    { r: 0.2666666805744171 , g: 0.7843137383460999 , b: 1                   }, // Greenish Blue
];

let nextColorIndex = 0;
export function getNextColor() {
    const result = RGB_COLORS[nextColorIndex];
    nextColorIndex = nextColorIndex === RGB_COLORS.length - 1 ? 0 : nextColorIndex + 1;
    return result;
}
