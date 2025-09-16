import readline from 'readline-sync';
import {
    registrar as registrarAlumno,
    modificar as modificarAlumno,
    eliminar as eliminarAlumno,
    listar as listarAlumno,
    asignar as asignarAlumno
} from './GesitonAlumno.js';
import {
    registrar as registrarCarrera,
    modificar as modificarCarrera,
    eliminar as eliminarCarrera,
    listar as listarCarrera
} from './GestionCarrera.js';

let respuesta = "";

function subMenu(entidad) {
    const gestiones = {
        '1': {
            nombre: 'alumno',
            registrar: registrarAlumno,
            modificar: modificarAlumno,
            eliminar: eliminarAlumno,
            listar: listarAlumno,
            asignar: asignarAlumno
        },
        '2': {
            nombre: 'carrera',
            registrar: registrarCarrera,
            modificar: modificarCarrera,
            eliminar: eliminarCarrera,
            listar: listarCarrera,
        }
    };

    const gestion = gestiones[entidad];
    if (!gestion) {
        throw new TypeError("Entidad no válida.");
    }

    try {
        const respuestaSubMenu = readline.question(`Seleccione una de estas opciones o ingrese 0 para cancelar.
1: Registrar nuevo ${gestion.nombre}
2: Modificar ${gestion.nombre}
3: Borrar ${gestion.nombre}
4: Mostrar todos los registros de ${gestion.nombre}${entidad === "1" ? '\n5: Asignar Alumno a Carrera' : ''}
`);

        switch (respuestaSubMenu) {
            case "1":
                gestion.registrar();
                break;
            case "2":
                gestion.modificar();
                break;
            case "3":
                gestion.eliminar();
                break;
            case "4":
                gestion.listar();
                break;
            case "5":
                if (entidad === "1") {
                    gestion.asignar();
                } else {
                    throw new TypeError("Opción no válida para Carreras.");
                }
                break;
            default:
                if (respuestaSubMenu !== "0") {
                    throw new TypeError("Ingrese un valor válido");
                }
                break;
        }

    } catch (error) {
        console.log("ERROR: ", error.message);
    }
}

while (respuesta !== "0") {
    try {
        respuesta =
            readline.question
                ("Seleccione la entidad que desea gestionar o ingrese 0 para cancelar. \n1: Alumnos \n2: Carreras \n");

        if (respuesta === "1" || respuesta === "2") {
            subMenu(respuesta);
        } else if (respuesta !== "0") {
            throw new TypeError("Ingrese un valor válido");
        }
    } catch (error) {
        console.log("ERROR: ", error.message);
    }
}
