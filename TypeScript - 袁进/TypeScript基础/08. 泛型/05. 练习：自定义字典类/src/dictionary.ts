export type CallBack<T, U> = (key: T, val: U) => void

export class Dictionary<K, V> {
    private keys: K[] = [];
    private vals: V[] = [];

    get size(){
        return this.keys.length;
    }

    set(key: K, val: V) {
        const i = this.keys.indexOf(key)
        if (i < 0) {
            this.keys.push(key);
            this.vals.push(val);
        }
        else {
            this.vals[i] = val;
        }
    }

    forEach(callback: CallBack<K, V>) {
        this.keys.forEach((k, i) => {
            const v = this.vals[i];
            callback(k, v);
        })
    }

    has(key: K) {
        return this.keys.includes(key);
    }

    delete(key: K) {
        const i = this.keys.indexOf(key);
        if (i === -1) {
            return;
        }
        this.keys.splice(i, 1);
        this.vals.splice(i, 1);
    }
}