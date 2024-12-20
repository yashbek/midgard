import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const sharedUsername = writable("");
export const sharedEmail = writable("");

if (typeof window !== 'undefined') {
    const hasToken = sessionStorage.getItem('authToken') !== null;
    isLoggedIn.set(hasToken);
    
    const storedUsername = sessionStorage.getItem('username');
    sharedUsername.set(hasToken && storedUsername ? storedUsername : "");
    
    const storedEmail = sessionStorage.getItem('email');
    sharedEmail.set(hasToken && storedEmail ? storedEmail : "");
}