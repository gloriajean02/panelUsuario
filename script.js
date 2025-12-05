import { showScene } from './utils/scenes.js';
import { cookieExists } from './utils/cookies.js';
import { registerForm } from "./modules/register.js";
import { loginForm, resetLoginForm } from "./modules/login.js";
import { showUserPanel } from "./modules/userPanel.js";
import { showBannerCookies } from './modules/bannerCookies.js';
import { getTheme, setTheme } from './modules/theme.js';

document.addEventListener('DOMContentLoaded', () => {

    getTheme();

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

    document.getElementById('changeTheme').addEventListener('click', (e) => {
        e.preventDefault();
        setTheme();
    });
});