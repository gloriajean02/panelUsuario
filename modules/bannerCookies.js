import { cookieExists, setCookie } from '../utils/cookies.js';

export function showBannerCookies() {
    
    const banner = document.getElementById('bannerCookies');

    if (!cookieExists('cookiesAllowed')) {
        banner.classList.remove('hidden');
    }

    document.getElementById('allowCookies').addEventListener('click', () => {
        setCookie('cookiesAllowed', 'true', 365);
        banner.classList.add('hidden');
    });
}