import Comprobante from "../models/Comprobante.js";
import CustomError from "./CustomError.js";

export const crearComprobante = async (idCliente) => {
    try {
        const comprobante = {
            idCliente,
        };

        const nuevoComprobante = await Comprobante.create(comprobante).catch(() => {
            throw new CustomError("Error al crear Comprobante", 500);
        });

        return nuevoComprobante;
    } catch (error) {
        throw new CustomError(`Error al crear el comprobante: ${error.message}`, 500);
    }
};

export const getComprobantes = async (query = {}) => {
    const comprobantes = await Comprobante.find(query).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener los comprobantes", 500);
    });
    return comprobantes;
};

export const getComprobanteById = async (idComprobante) => {
    const comprobante = await Comprobante.findById(idComprobante).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener el comprobante", 500);
    });

    if (!comprobante) {
        throw new CustomError('Comprobante no encontrado', 404);
    }
    
    return comprobante;
}; 

export const finalizarComprobante = async (idComprobante) => {
    const finalizado = await Comprobante.findByIdAndUpdate(idComprobante, { finalizado: true }, {
        new: true,
        runValidators: true,
    }).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al finalizar el comprobante", 500);
    });

    if (!finalizado) {
        throw new CustomError("Comprobante no encontrado", 404);
    }

    return finalizado;
};