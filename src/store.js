import { writable } from 'svelte/store';

export function persistentStore(key, startValue) {
    const isBrowser = typeof window !== 'undefined';
    const storedValue = isBrowser ? sessionStorage.getItem(key) : null;
    const initialValue = storedValue === null ? startValue : JSON.parse(storedValue);
    
    const store = writable(initialValue);

    if (isBrowser) {
        store.subscribe(value => {
            sessionStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
}

export const userid = persistentStore('userid', 0);

export const orders = persistentStore('orders', []);  // Initial value set to null
