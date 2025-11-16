import { encryptPassword } from '../utils/cryptoPassword.js';
import { regexUser, regexPassword, regexAge, regexPhone, regexPostalCode } from '../utils/regex.js';
import { USERNAME_INVALID, PASSWORD_INVALID, AGE_INVALID, PHONENUMBER_INVALID, POSTALCODE_INVALID } from '../utils/messages.js'
import { showScene } from '../utils/scenes.js';

// Guardamos los elementos en variables
let formElement = document.getElementById("registerForm");
let inputUserElement = document.getElementById("userName");
let inputPasswordElement = document.getElementById("userPassword");
let inputPhoneElement = document.getElementById("userPhone");
let inputPostalCodeElement = document.getElementById("userPostalCode");
let inputLegalAgeElement = document.getElementById("userLegalAge");
let divAgeElement = document.getElementById("ageDiv");
let inputAgeElement = document.getElementById("userAge");
let submitButtonElement = document.getElementById("registerButton");
const showPassword = document.getElementById("registerShowPassword");

// Creamos banderas para saber si los valores son válidos
let userValid = false;
let passwordValid = false;
let phoneValid = false;
let postalCodeValid = false;
let legalAge = false;
let ageValid = false;

let validForm = false;

// Chequea todas las banderas, si son todas true habilita el botón submit
function checkFullForm() {
    const mandatoryFlags = [userValid, passwordValid, phoneValid, postalCodeValid];

    let validFlags = true;

    for (let i = 0; i < mandatoryFlags.length && validFlags; i++) {
        if (!mandatoryFlags[i]) {
            validFlags = false;
        }
    }

    if (validFlags && legalAge && !ageValid) {
        validFlags = false;
    }

    if (validFlags) {
        submitButtonElement.classList.remove("notAvailable");
        submitButtonElement.disabled = false; // habilitar el botón
        validForm = true;
    } else {
        submitButtonElement.classList.add("notAvailable");
        submitButtonElement.disabled = true;
    }
}

// ----------------- VALIDAR USUARIO -----------------
function validateUser() {
    userValid = regexUser.test(inputUserElement.value);
    inputUserElement.className = userValid ? "success" : "error";

    if (!userValid) {
        // Obtenemos la etiqueta <small> del div al que pertenece el input
        inputUserElement.parentNode.getElementsByTagName("small")[0].innerHTML = USERNAME_INVALID;
    } else {
        inputUserElement.parentNode.getElementsByTagName("small")[0].innerHTML = "";
    }

    return userValid;
}

// ----------------- VALIDAR CONTRASEÑA -----------------
function validatePassword() {
    passwordValid = regexPassword.test(inputPasswordElement.value);
    inputPasswordElement.className = passwordValid ? "success" : "error";

    // Obtenemos la etiqueta <small> del div al que pertenece el input
    // En este caso tendríamos que pasar dos parent node para acceder a small,
    // por eso lo hago con closest
    const small = inputPasswordElement.closest('.inputContainer').querySelector('small');
    small.innerHTML = passwordValid ? "" : PASSWORD_INVALID;

    return passwordValid;
}

// ----------------- VALIDAR TELÉFONO -----------------
function validatePhone() {
    phoneValid = regexPhone.test(inputPhoneElement.value);
    inputPhoneElement.className = phoneValid ? "success" : "error";

    if (!phoneValid) {
        inputPhoneElement.parentNode.getElementsByTagName("small")[0].innerHTML = PHONENUMBER_INVALID;
    } else {
        inputPhoneElement.parentNode.getElementsByTagName("small")[0].innerHTML = "";
    }

    return phoneValid;
}

// ----------------- VALIDAR CÓDIGO POSTAL -----------------
function validatePostalCode() {
    postalCodeValid = regexPostalCode.test(inputPostalCodeElement.value);
    inputPostalCodeElement.className = postalCodeValid ? "success" : "error";

    if (!postalCodeValid) {
        inputPostalCodeElement.parentNode.getElementsByTagName("small")[0].innerHTML = POSTALCODE_INVALID;
    } else {
        inputPostalCodeElement.parentNode.getElementsByTagName("small")[0].innerHTML = "";
    }

    return postalCodeValid;
}


// ----------------- VALIDAR EDAD -----------------
function validateAge() {
    ageValid = regexAge.test(inputAgeElement.value);
    inputAgeElement.className = ageValid ? "success" : "error";

    if (!ageValid) {
        inputAgeElement.parentNode.getElementsByTagName("small")[0].innerHTML = AGE_INVALID;
    } else {
        inputAgeElement.parentNode.getElementsByTagName("small")[0].innerHTML = "";
    }

    return ageValid;
}



export function registerForm() {
    // MOSTRAR U OCULTAR CONTRASEÑA
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

    // Si el checkbox legalAge está marcado, mostramos la casilla de edad,
    // si lo desmarcamos desaparece de nuevo
    inputLegalAgeElement.addEventListener("change", () => {
        if (inputLegalAgeElement.checked) {
            legalAge = true;
            divAgeElement.classList.remove("hidden");
            divAgeElement.classList.add("inputContainer");
        } else {
            divAgeElement.classList.add("hidden");
            divAgeElement.classList.remove("inputContainer");
            inputAgeElement.value = "";
        }
    });

    inputUserElement.addEventListener("keyup", () => {
        validateUser();
        checkFullForm();
    });
    inputPasswordElement.addEventListener("keyup", () => {
        validatePassword();
        checkFullForm();
    });
    inputPhoneElement.addEventListener("keyup", () => {
        validatePhone();
        checkFullForm();
    });
    inputPostalCodeElement.addEventListener("keyup", () => {
        validatePostalCode();
        checkFullForm();
    });
    inputLegalAgeElement.addEventListener("change", () => {
        inputAgeElement.addEventListener("keyup", validateAge);
        checkFullForm();
    });

    

    formElement.addEventListener('submit', async (event) => {
        /*
        Para detener el envío del formulario, llamar al método preventDefault() del objeto de evento
        dentro del controlador de eventos de envío de esta manera:
        */
        event.preventDefault();

        if (validForm) {
            const username = inputUserElement.value;
            if (localStorage.getItem(username)) {
                alert("El nombre de usuario ya existe.");
                return;
            }

            const encrypted = await encryptPassword(inputPasswordElement.value);

            const userData = {
                password: encrypted,
                phone: inputPhoneElement.value,
                postalCode: inputPostalCodeElement.value,
                legalAge: inputLegalAgeElement.checked ? true : false,
                age: inputLegalAgeElement.checked ? inputAgeElement.value : null
            };

            localStorage.setItem(username, JSON.stringify(userData));
            alert("Registro completado con éxito.");
            formElement.reset();
            showScene('loginForm');

        } else {
            alert("Por favor, corrige los errores antes de enviar.");
        }
    });
}
