// Función que convierte un ArrayBuffer (datos binarios) en un string hexadecimal
// Sirve para que los datos del hash o la sal sean legibles y guardables como texto
function bufferToHex(buffer) {
    // Convierte los datos binarios en un array de números (0-255)
    return Array.from(new Uint8Array(buffer))
        // Convierte cada número en su equivalente hexadecimal y rellena con cero a la izquierda si hace falta
        .map(b => b.toString(16).padStart(2, "0"))
        // Junta todos los hexadecimales en un solo string
        .join("");
}

// Función que genera un hash SHA-256 de un texto
// Sirve para transformar la contraseña en un código seguro que no se pueda leer directamente
export async function hashText(text) {
    const encoder = new TextEncoder(); // Prepara el texto para que pueda ser procesado por el hash
    const data = encoder.encode(text); // Convierte el texto en bytes

    // Genera el hash SHA-256 de esos bytes
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convierte el hash a un string hexadecimal para que se pueda guardar o comparar
    return bufferToHex(hashBuffer);
}

// Función que crea una sal aleatoria de 16 bytes
// La sal se usa para que aunque dos personas tengan la misma contraseña, los hashes sean diferentes
function generateSalt() {
    const saltArray = new Uint8Array(16);   // Creamos un array de 16 posiciones para la sal
    crypto.getRandomValues(saltArray);      // Lo llenamos con números aleatorios seguros
    return bufferToHex(saltArray);          // Lo convertimos a texto hexadecimal para guardarlo
}

// Función que cifra una contraseña
// Combina la contraseña con una sal y genera su hash, devolviendo ambos para guardar
export async function encryptPassword(password) {
    const salt = generateSalt();                    // Genera la sal aleatoria
    const hash = await hashText(password + salt);  // Crea el hash de la contraseña junto con la sal
    return { salt, hash }                           // Devuelve un objeto con la sal y el hash para almacenar
}
