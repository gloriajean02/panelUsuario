// Obtiene el valor de una cookie por su nombre.
// Devuelve el valor de la cookie si existe, o null si no se encuentra.
export function getCookie(name) {
    // Divide el string de cookies en un array, separando por ';' y eliminando espacios.
    const cookieList = document.cookie.split(';').map(c => c.trim());
    // Busca la cookie que empieza por 'name='.
    const cookieFound = cookieList.find(cookie => cookie.startsWith(name + '='));
    if (cookieFound) {
        // Si la encuentra, devuelve el valor (lo que está después del '=').
        return cookieFound.split('=')[1];
    } else {
        // Si no existe, devuelve null.
        return null;
    }
}

// Crea o actualiza una cookie, asignando nombre, valor y fecha de expiración (en días).
export function setCookie(name, value, days) {
    // Obtiene la fecha y hora actual.
    const now = new Date();
    // Calcula la cantidad de milisegundos correspondiente a los días indicados (1 día).
    const timeExpires = now.getTime() + (days * 24 * 60 * 60 * 1000);
    // Crea una nueva fecha de expiración sumando los días.
    const expiresDate = new Date(timeExpires);
    // Asigna la cookie con el nombre y valor, la fecha de expiración y la ruta '/' (disponible en todo el sitio).
    document.cookie = `${name}=${value}; expires=${expiresDate.toUTCString()}; path=/`;
}

// en JS no existe un método para borrar las cookies, así que lo que se hace es crear/modificar la cookie existente 
// con el mismo nombre y asignar una fecha de expiración en el pasado (por ejemplo, el 1 de enero de 1970). 
// El navegador detecta que la cookie ya ha expirado y la elimina
export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Comprueba si existe una cookie llamando a la función getCookie.
// Devuelve true si existe, false si no existe.
export function cookieExists(name) {
    return getCookie(name) !== null;
}
