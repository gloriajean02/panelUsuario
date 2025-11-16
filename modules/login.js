import { hashText } from '../utils/cryptoPassword.js';
import { setCookie } from '../utils/cookies.js';
import { USER_NOT_FOUND , DATA_INVALID } from '../utils/messages.js';

// Guardamos los elementos en variables
let formElement = document.getElementById("loginForm");
let inputUserElement = document.getElementById("userName");
let inputPasswordElement = document.getElementById("userPassword");


// MOSTRAR U OCULTAR CONTRASEÑA
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", () => {
    // Cambiamos el type a text si queremos mostrar
    const type = inputPasswordElement.type === "password" ? "text" : "password";
    inputPasswordElement.type = type;

    // Cambiamos la imagen
    const img = showPassword.src.includes("invisible.png")
        ? "../images/visible.png"
        : "../images/invisible.png";
    showPassword.src = img;
});

formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = inputUserElement.value;
    const password = inputPasswordElement.value;

    // Buscamos la data del usuario en localStorage
    const userData = localStorage.getItem(username);

    const small = document.querySelector('small');

    // Caso en el que el usuario no exista
    if (!userData) {
        small.innerHTML = USER_NOT_FOUND;
    } else {
        // Si existe, formateamos la data a JSON
        const userDataFormat = JSON.parse(userData);
        // Formateamos la contraseña a hashtext para comprobar si es correcta
        const hashedInput = await hashText(password + userDataFormat.password.salt);

        //Si es correcta creamos cookie de 1 día
        if (hashedInput === userDataFormat.password.hash) {
            setCookie('user', username, 1);
        } else {
            small.innerHTML = DATA_INVALID;
        }
    }

    
});