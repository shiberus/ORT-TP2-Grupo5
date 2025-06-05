import CustomError from "./CustomError.js";
import Cliente from "../models/Cliente.js"

export const crearCliente = async (nombre, email, telefono, direccion) => {
    try {
        const cliente = {
            nombre,
            email,
            telefono,
            direccion,
        };

        const nuevoCliente = await Cliente.create(cliente).catch(() => {
            throw new CustomError("Error al crear cliente", 500);
        });

        return nuevoCliente;
    } catch (error) {
        throw new CustomError(`Error al crear el cliente: ${error.message}`, 500);
    }
};

export const getClientes = async (query = {}) => {
    const clientes = await Cliente.find(query).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener los comprobantes", 500);
    });
    return clientes;
};

export const getClienteById = async (idCliente) => {
    const cliente = await Cliente.findById(idCliente).catch((error) => {
        console.error("Error: ", error);
        throw new CustomError("Error al obtener el cliente", 500);
    });

    if (!cliente) {
        throw new CustomError('Cliente no encontrado', 404);
    }
    
    return cliente;
}; 