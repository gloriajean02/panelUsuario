import { getCookie, deleteCookie } from '../utils/cookies.js';
import { showScene } from '../utils/scenes.js';
import { resetLoginForm } from './login.js';

export function showUserPanel() {
    document.getElementById('welcome').innerHTML = "Bienvenidx, "+getCookie('user')
    document.getElementById('logout').addEventListener('click', () => {
        deleteCookie('user');
        resetLoginForm();
        showScene('loginForm');
    });

}