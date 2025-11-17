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

export const regexUser = /^\S{3,}$/; // \S → cualquier carácter que NO sea espacio | "{3,}" → mín 3 caracteres
export const regexPassword = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/; // (?=.*[A-Z])  → AL MENOS una letra mayúscula | (?=.*[a-z])  → AL MENOS una letra minúscula
export const regexPhone = /^\d{9}$/; // \d{9}  → Dígito (\d) exactamente 9 veces {9}. 
export const regexPostalCode = /^\d{5}$/;
export const regexAge = /^(1[8-9]|[2-9][0-9])$/; // Dos opciones: 1[8-9] → un 1 y un 8 o un 9 (18 0 19), o [2-9][0-9] → un número entre 1 y 9 + un número entre 0 y 9
