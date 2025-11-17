import { getCookie, setCookie } from '../utils/cookies.js';

export function getTheme() {
    const themeCookie = getCookie('theme');
    if (themeCookie === 'dark') {
        document.body.classList.add('darkTheme');
    } else {
        document.body.classList.remove('darkTheme');
    }
}


export function setTheme() {
    // Si document.body NO tiene la clase 'darkTheme', la agrega.
    // Si document.body YA tiene la clase 'darkTheme', la quita.
    document.body.classList.toggle('darkTheme');
    const theme = document.body.classList.contains('darkTheme') ? 'dark' : 'light';
    setCookie('theme', theme, 365); 
}