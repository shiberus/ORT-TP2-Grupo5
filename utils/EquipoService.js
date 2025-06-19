import CustomError from "./CustomError.js";
import Equipo from "../models/Equipo.js";

export const crearEquipo = async (nombre, modelo, idCliente) => {
    try {
        const equipo = { nombre, modelo, idCliente };
        const nuevoEquipo = await Equipo.create(equipo).catch(() => {
            throw new CustomError("Error al crear equipo", 500);
        });
        return nuevoEquipo;
    } catch (error) {
        throw new CustomError(`Error al crear el equipo: ${error.message}`, 500);
    }
};

export const getEquipos = async (query = {}) => {
    const equipos = await Equipo.find(query).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener los equipos", 500);
    });
    return equipos;
};

export const getEquipoById = async (idEquipo) => {
    const equipo = await Equipo.findById(idEquipo).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener el equipo", 500);
    });
    if (!equipo) {
        throw new CustomError('Equipo no encontrado', 404);
    }
    return equipo;
};

export const actualizarEquipo = async (idEquipo, data) => {
    try {
        const equipoActualizado = await Equipo.findByIdAndUpdate(idEquipo, data, { new: true }).catch(() => {
            throw new CustomError("Error al actualizar equipo", 500);
        });
        if (!equipoActualizado) {
            throw new CustomError('Equipo no encontrado', 404);
        }
        return equipoActualizado;
    } catch (error) {
        throw new CustomError(`Error al actualizar el equipo: ${error.message}`, 500);
    }
};

export const eliminarEquipo = async (idEquipo) => {
    try {
        const equipoEliminado = await Equipo.findByIdAndDelete(idEquipo).catch(() => {
            throw new CustomError("Error al eliminar equipo", 500);
        });
        if (!equipoEliminado) {
            throw new CustomError('Equipo no encontrado', 404);
        }
        return equipoEliminado;
    } catch (error) {
        throw new CustomError(`Error al eliminar el equipo: ${error.message}`, 500);
    }
}; 