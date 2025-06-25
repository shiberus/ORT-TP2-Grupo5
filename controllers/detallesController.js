import * as detalleSvc from "../utils/DetalleService.js";
import * as comprobanteSvc from "../utils/ComprobanteService.js";

export const GetDetalles = async (req, res) => {
    const detalles = await detalleSvc.getDetalles();
    return res.json(detalles);
};

export const GetDetalleById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const detalle = await detalleSvc.getDetalleById(id);
        return res.json(detalle);
    } catch (error) {
        return next(error);
    }
};

export const CrearDetalle = async (req, res, next) => {
    if (!req.body || !req.body.idComprobante || !req.body.idTrabajo) {
        return res
            .status(400)
            .json({ error: "Faltan datos (idComprobante, idTrabajo)" });
    }

    const { idComprobante, idTrabajo } = req.body;

    try {
        const comprobante = await comprobanteSvc.getComprobanteById(idComprobante);
        if (comprobante.finalizado) {
            return res
                .status(400)
                .json({ error: "No se pueden agregar detalles a un comprobante finalizado" });
        }

        const nuevoDetalle = await detalleSvc.crearDetalle(
            idTrabajo,
            idComprobante
        );
        return res.status(201).json(nuevoDetalle);
    } catch (error) {
        return next(error);
    }
};

export const GetDetalleWithTrabajoByIdCabecera = async (req, res, next) => {
    const { idComprobanteCabecera } = req.params;
    
    try {
        const detalles = await detalleSvc.getDetalleWithTrabajoByIdCabecera(idComprobanteCabecera);
        return res.json(detalles);
    } catch (error) {
        return next(error);
    }
};
