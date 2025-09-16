import readline from 'readline-sync';
import Alumno from "./Alumno.js";
import { carreras } from './GestionCarrera.js';

const alumnos = [];

function generarNuevoId() {
    if (alumnos.length === 0) {
        return 1;
    }
    const ultimoAlumno = alumnos[alumnos.length - 1];
    return ultimoAlumno.id + 1;
}

/**
 * Pide al usuario los datos para registrar un alumno.
 */
export function registrar() {
    const id = generarNuevoId();
    const paterno = readline.question("Ingrese el apellido paterno: ");
    const materno = readline.question("Ingrese el apellido materno: ");
    const nombre = readline.question("Ingrese el nombre: ");
    const fechaNacimiento = readline.question("Ingrese la fecha de nacimiento (YYYY-MM-DD): ");
    const idCarrera = null;

    alumnos.push(new Alumno(id, paterno, materno, nombre, fechaNacimiento, idCarrera));
    console.log(`Alumno creado correctamente con ID: ${id}`);
}

/**
 * Modifica los datos de un alumno existente.
 */
export function modificar() {
    const id = readline.question("Ingrese el ID del Alumno a modificar: ");
    const indice = alumnos.findIndex(alumno => alumno.id === parseInt(id));

    if (indice === -1) {
        console.log("Alumno no encontrado.");
        return;
    }

    const alumno = alumnos[indice];
    console.log(`\nModificando alumno: ${alumno.nombre} ${alumno.paterno}`);

    const nuevoPaterno = readline.question(`Apellido paterno (${alumno.paterno}): `);
    const nuevoMaterno = readline.question(`Apellido materno (${alumno.materno}): `);
    const nuevoNombre = readline.question(`Nombre (${alumno.nombre}): `);
    const nuevaFechaNacimiento = readline.question(`Fecha de nacimiento (${alumno.fechaNacimiento}): `);
    const nuevoIdCarrera = readline.question(`ID de Carrera (${alumno.idCarrera}): `);

    if (nuevoPaterno) alumno.paterno = nuevoPaterno;
    if (nuevoMaterno) alumno.materno = nuevoMaterno;
    if (nuevoNombre) alumno.nombre = nuevoNombre;
    if (nuevaFechaNacimiento) alumno.fechaNacimiento = nuevaFechaNacimiento;
    if (nuevoIdCarrera) alumno.idCarrera = nuevoIdCarrera;

    console.log("Alumno modificado correctamente.");
}

/**
 * Elimina a un alumno existente.
 */
export function eliminar() {
    const id = readline.question("Ingrese el ID del Alumno a eliminar: ");
    const indice = alumnos.findIndex(alumno => alumno.id === parseInt(id));

    if (indice === -1) {
        console.log("Alumno no encontrado.");
        return;
    }

    alumnos.splice(indice, 1);
    console.log("Alumno eliminado correctamente.");
}

/**
 * Lista a todos los alumnos.
 */
export function listar() {
    if (alumnos.length === 0) {
        console.log("No hay alumnos registrados.");
        return;
    }
    alumnos.forEach(alumno => {
        console.log(`ID: ${alumno.id}, Nombre: ${alumno.nombre} ${alumno.paterno} ${alumno.materno}, Fecha de Nacimiento: ${alumno.fechaNacimiento}, ID Carrera: ${alumno.idCarrera || 'No asignada'}`);
    });

}

/**
 * Le asigna una carrera existente a un alumno existente.
 */
export function asignar() {
    const idAlumno = readline.question("Ingrese el ID del alumno a asignar: ");
    const idCarrera = readline.question("Ingrese el ID de la carrera a asignar: ");

    const indiceAlumnos = alumnos.findIndex(alumno => alumno.id === parseInt(idAlumno));
    const indiceCarrera = carreras.findIndex(carrera => carrera.id === parseInt(idCarrera));

    if (indiceAlumnos === -1) {
        console.log("Alumno no encontrado.");
        return;
    }
    if (indiceCarrera === -1) {
        console.log("Carrera no encontrado.");
        return;
    }

    alumnos[indiceAlumnos].idCarrera = parseInt(idCarrera);

    console.log(`Se ha asignado correctamente la carrera al alumno`);
}