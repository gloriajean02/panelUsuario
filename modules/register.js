import { encryptPassword } from '../utils/cryptoPassword.js';

// Guardamos los elementos en variables
let formElement = document.getElementById("loginForm");
let inputUserElement = document.getElementById("userName");
let inputPasswordElement = document.getElementById("userPassword");
let inputPhoneElement = document.getElementById("userPhone");
let inputPostalCodeElement = document.getElementById("userPostalCode");
let inputLegalAgeElement = document.getElementById("userLegalAge");
let divAgeElement = document.getElementById("ageDiv");
let inputAgeElement = document.getElementById("userAge");
let submitButtonElement = document.getElementById("submitButton");

// Creamos banderas para saber si los valores son válidos
let userValid = false;
let passwordValid = false;
let phoneValid = false;
let postalCodeValid = false;
let legalAge = false;
let ageValid = false;

// Si el checkbox legalAge está marcado, mostramos la casilla de edad,
// si lo desmarcamos desaparece de nuevo
inputLegalAgeElement.addEventListener("change", () => {
    if (inputLegalAgeElement.checked) {
        legalAge = true;
        divAgeElement.classList.remove("hidden");
    } else {
        divAgeElement.classList.add("hidden");
        inputAgeElement.value = "";
    }
});

// REGEX para validar los campos

// -------------------------- MINIGLOSARIO PARA ENTENDER REGEX --------------------------------
//     ^     → Inicio de la cadena. Ej: /^a/  coincide si la cadena empieza con "a"
//     $     → Final de la cadena. Ej: /a$/  coincide si la cadena termina con "a"
//     .     → Cualquier carácter excepto salto de línea. Ej: /a.b/ coincide con "acb", "a1b", etc.
//     *     → Cero o más veces del carácter o grupo anterior. Ej: /ab*/ coincide con "a", "ab", "abb", "abbb", ...
//     ?=    → Lookahead positivo: se cumple la condición, pero no consume caracteres. Ej: /(?=.*[A-Z])/ exige al menos una mayúscula en cualquier parte
//     ?!    → Lookahead negativo: la condición NO debe cumplirse. Ej: /(?!.*[0-9])/ asegura que no haya números en la cadena
//     \d    → Dígito numérico [0-9]. Ej: /\d/ coincide con "0", "1", ..., "9"
//     \D    → No dígito. Ej: /\D/ coincide con cualquier carácter que no sea un número
//     {n,m} → Entre n y m repeticiones. Ej: /a{2,4}/ coincide con "aa", "aaa", "aaaa"
//     []    → Conjunto de caracteres. Ej: /[abc]/ coincide con "a" o "b" o "c"
//     [^]   → Negación de conjunto. Ej: /[^abc]/ coincide con cualquier carácter que NO sea "a", "b" ni "c"     

let regexUser = /^.{4,}$/; // "{4,}" → mín 4 caracteres (+ de 3)
let regexPassword = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/; // (?=.*[A-Z])  → AL MENOS una letra mayúscula | (?=.*[a-z])  → AL MENOS una letra minúscula
let regexPhone = /^\d{9}$/; // \d{9}  → Dígito (\d) exactamente 9 veces {9}. 
let regexPostalCode = /^\d{5}$/;
let regexAge = /^(1[8-9]|[2-9][0-9])$/; // Dos opciones: 1[8-9] → un 1 y un 8 o un 9 (18 0 19), o [2-9][0-9] → un número entre 1 y 9 + un número entre 0 y 9

// CONSTANTES PARA LOS MENSAJES DE ERROR
const USERNAME_INVALID = "Mínimo 3 caracteres";
const PASSWORD_INVALID = "Mínimo 8 caracteres, con al menos 1 mayúscula y 1 minúscula.";
const PHONENUMBER_INVALID = "Debe contener exactamente 9 dígitos";
const POSTALCODE_INVALID = "Debe contener exactamente 5 dígitos";
const AGE_INVALID = "La edad debe estar entre 18 y 99 años";

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
        validForm = true;
    } else {
        submitButtonElement.classList.add("notAvailable");
    }
}

// ----------------- VALIDAR USUARIO -----------------
inputUserElement.addEventListener("keyup", () => { // Keyup comprueba cada vez que se suelta una tecla
    validateUser();
    checkFullForm();
});

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
inputPasswordElement.addEventListener("keyup", () => {
    validatePassword();
    checkFullForm();
});

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
inputPhoneElement.addEventListener("keyup", () => {
    validatePhone();
    checkFullForm();
});

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
inputPostalCodeElement.addEventListener("keyup", () => {
    validatePostalCode();
    checkFullForm();
});

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
inputAgeElement.addEventListener("keyup", () => {
    validateAge();
    checkFullForm();
});

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
})


formElement.addEventListener('submit', async (event) => {
    /*
    Para detener el envío del formulario, llamar al método preventDefault() del objeto de evento
    dentro del controlador de eventos de envío de esta manera:
    */
    event.preventDefault();

    checkFullForm();

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
            legalAge: inputLegalAgeElement.checked,
            age: inputLegalAgeElement.checked ? inputAgeElement.value : null
        };

        localStorage.setItem(username, JSON.stringify(userData));
        alert("Registro completado con éxito.");
        formElement.reset();
        showScene('inicioSesion');

    } else {
        alert("Por favor, corrige los errores antes de enviar.");
    }


});

