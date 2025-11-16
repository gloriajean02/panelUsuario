import { showScene } from '../utils/scenes.js';
import { cookieExists } from '../utils/cookies.js';
import { registerForm } from "./register.js";
import { loginForm, resetLoginForm } from "./login.js";
import { showUserPanel } from "./userPanel.js";
import { showBannerCookies } from './bannerCookies.js';

document.addEventListener('DOMContentLoaded', () => {

    showBannerCookies();

    if (cookieExists('user')) {
        showScene('userPanel');
    } else {
        showScene('loginForm');
    }

    registerForm();
    loginForm(); 
    showUserPanel();

    document.getElementById('register').addEventListener('click', (e) => {
        e.preventDefault();
        showScene('registerForm');
    });

    document.getElementById('login').addEventListener('click', (e) => {
        e.preventDefault();
        resetLoginForm();
        showScene('loginForm');
    });
});