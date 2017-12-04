export class ValueProxy<ObserverType extends API.ValueChangedCallback> {
    private _target: API.Value<ObserverType>;
    private _eventValueCache: any[] = [];
    private _allSubscriptions: any[] = [];
    private _activeSubscriptions: any[] = [];
    private _isApiSubscribed: boolean = false;

    constructor(target: API.Value<ObserverType>, valueWhenUnassigned?: any) {
        this._target = target;
        target.addValueObserver((this._handleEvent as any) as ObserverType, valueWhenUnassigned);
    }

    private __noSuchMethod__(methodName: string, args) {
        return this._target[methodName].apply(this._target, args);
    }

    private _handleEvent(...args: any[]) {
        this._eventValueCache = args;
        for (const callback of this._activeSubscriptions) callback(...args);
    }

    private _updateApiSubscription() {
        if (this._activeSubscriptions.length > 0) {
            if (!this._isApiSubscribed) {
                this._target.subscribe();
                this._isApiSubscribed = true;
            }
        } else {
            if (this._isApiSubscribed) {
                this._target.unsubscribe();
                this._isApiSubscribed = false;
            }
        }
    }

    addValueObserver(callback: ObserverType): { subscribe: () => void; unsubscribe: () => void } {
        if (this._allSubscriptions.indexOf(callback) !== -1)
            throw new Error('Error: observer callback already registered.');
        this._allSubscriptions = [...this._allSubscriptions, callback];
        return {
            subscribe: () => {
                const index = this._activeSubscriptions.indexOf(callback);
                if (index === -1) {
                    this._activeSubscriptions = [...this._activeSubscriptions, callback];
                    // on subscribe call callback with current value
                    (callback as any)(...this._eventValueCache);
                }
                this._updateApiSubscription();
            },
            unsubscribe: () => {
                const index = this._activeSubscriptions.indexOf(callback);
                if (index !== -1) {
                    this._activeSubscriptions = [
                        ...this._activeSubscriptions.slice(0, index),
                        ...this._activeSubscriptions.slice(index + 1),
                    ];
                }
                this._updateApiSubscription();
            },
        };
    }
}
