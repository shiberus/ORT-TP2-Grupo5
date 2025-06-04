import Comprobante from "../models/Comprobante.js";
import CustomError from "./CustomError.js";

export const crearComprobante = async (idCliente, monto, idComponente, idTrabajo, idEmpleado) => {
    try {
        const comprobante = {
            idCliente,
            monto,
            idComponente,
            idTrabajo,
            idEmpleado
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