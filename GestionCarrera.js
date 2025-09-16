import readline from 'readline-sync';
import Carrera from './Carrera.js';
export const carreras = [];


function generarNuevoId() {
    if (carreras.length === 0) {
        return 1;
    }
    const ultimaCarrera = carreras[carreras.length - 1];
    return ultimaCarrera.id + 1;
}

/**
 * Pide al usuario los datos para una nueva carrera y la registra.
 */
export function registrar() {
    const id = generarNuevoId();
    const nombre = readline.question("Ingrese el nombre de la carrera: ");

    const nombreExistente = carreras.find(carrera => carrera.nombre.toLowerCase() === nombre.toLowerCase());
    if (nombreExistente) {
        console.log("Error: Ya existe una carrera con ese nombre.");
        return;
    }

    carreras.push(new Carrera(id, nombre));
    console.log(`Se creó la carrera correctamente. ID: ${id}`);
}

/**
 * Modifica los datos de una carrera existente.
 */
export function modificar() {
    const id = readline.question("Ingrese el ID de la carrera a modificar: ");
    const indice = carreras.findIndex(carrera => carrera.id === parseInt(id));

    if (indice === -1) {
        console.log("Carrera no encontrada.");
        return;
    }

    const carrera = carreras[indice];
    console.log(`\nModificando carrera: ${carrera.nombre}`);

    const nuevoNombre = readline.question(`Nombre (${carrera.nombre}): `);

    if (nuevoNombre) {
        carrera.nombre = nuevoNombre;
        console.log("Carrera modificada correctamente.");
    } else {
        console.log("No se realizaron cambios.");
    }
}

/**
 * Elimina una carrera del arreglo por su ID.
 */
export function eliminar() {
    const id = readline.question("Ingrese el ID de la carrera a eliminar: ");
    const indice = carreras.findIndex(carrera => carrera.id === parseInt(id));

    if (indice === -1) {
        console.log("❌ Carrera no encontrada.");
        return;
    }

    carreras.splice(indice, 1);
    console.log("Carrera eliminada correctamente.");
}

/**
 * Muestra todas las carreras registradas.
 */
export function listar() {
    if (carreras.length === 0) {
        console.log("ℹ️ No hay carreras registradas.");
        return;
    }
    carreras.forEach(carrera => {
        console.log(`ID: ${carrera.id}, Nombre: ${carrera.nombre}`);
    });
}