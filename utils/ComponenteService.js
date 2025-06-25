import CustomError from "./CustomError.js";
import Componente from "../models/Componente.js";

export const crearComponente = async (nombre, costo) => {
    try {
        const componente = { nombre, costo };

        const nuevoComponente = await Componente.create(componente).catch(() => {
        throw new CustomError("Error al crear componente", 500);
        });

        return nuevoComponente;
    } catch (error) {
        throw new CustomError(`Error al crear el componente: ${error.message}`, 500);
    }
    };

    export const getComponentes = async (query = {}) => {
    const componentes = await Componente.find(query).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener los componentes", 500);
    });
    return componentes;
    };

    export const getComponenteById = async (idComponente) => {
    const componente = await Componente.findById(idComponente).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener el componente", 500);
    });

    if (!componente) {
        throw new CustomError("Componente no encontrado", 404);
    }

    return componente;
    };

    export const actualizarComponente = async (idComponente, data) => {
    try {
        const componenteActualizado = await Componente.findByIdAndUpdate(
        idComponente,
        data,
        { new: true }
        ).catch(() => {
        throw new CustomError("Error al actualizar componente", 500);
        });

        if (!componenteActualizado) {
        throw new CustomError("Componente no encontrado", 404);
        }

        return componenteActualizado;
    } catch (error) {
        throw new CustomError(`Error al actualizar el componente: ${error.message}`, 500);
    }
};
