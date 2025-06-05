import * as clientesSvc from "../utils/ClientesService.js"

export const GetClientes = async (req, res) => {
    const clientes = await clientesSvc.getClientes();
    return res.json(clientes);
};

export const GetClienteById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const cliente = await clientesSvc.getClienteById(id);
        return res.json(cliente);
    } catch (error) {
        return next(error);
    }
};

export const CrearCliente = async (req, res, next) => {
    if (
        !req.body ||
        !req.body.nombre ||
        !req.body.email ||
        !req.body.telefono ||
        !req.body.direccion
    ) {
        return res
            .status(400)
            .json({ error: "Faltan datos (nombre, email, telefono, direccion)" });
    }

    const { nombre, email, telefono, direccion } = req.body;

    try {
        const nuevoCliente = await clientesSvc.crearCliente(
            nombre,
            email,
            telefono,
            direccion
        );
        return res.status(201).json(nuevoCliente);
    } catch (error) {
        return next(error);
    }
}; 