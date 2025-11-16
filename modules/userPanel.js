import { getCookie, deleteCookie } from '../utils/cookies.js';
import { showScene } from '../utils/scenes.js';

export function showUserPanel() {
    document.getElementById('welcome').innerHTML = "Bienvenidx, "+getCookie('usuario')
    document.getElementById('logout').addEventListener('click', () => {
        deleteCookie('usuario');
        showScene('login');
    });

}