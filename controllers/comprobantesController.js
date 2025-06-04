import * as comprobanteSvc from "../utils/ComprobanteService.js";

export const GetComprobantes = async (req, res) => {
    const comprobantes = await comprobanteSvc.getComprobantes();
    return res.json(comprobantes);
};

export const GetComprobanteById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const comprobante = await comprobanteSvc.getComprobanteById(id);
        return res.json(comprobante);
    } catch (error) {
        return next(error);
    }
};

export const CrearComprobante = async (req, res, next) => {
    if (
        !req.body ||
        !req.body.idCliente ||
        !req.body.monto ||
        !req.body.idComponente ||
        !req.body.idTrabajo ||
        !req.body.idEmpleado
    ) {
        return res
            .status(400)
            .json({ error: "Faltan datos (idCliente, monto, idComponente, idTrabajo, idEmpleado)" });
    }

    const { idCliente, monto, idComponente, idTrabajo, idEmpleado } = req.body;

    try {
        const nuevoComprobante = await comprobanteSvc.crearComprobante(
            idCliente,
            monto,
            idComponente,
            idTrabajo,
            idEmpleado
        );
        return res.status(201).json(nuevoComprobante);
    } catch (error) {
        return next(error);
    }
}; 