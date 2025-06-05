import * as detalleSvc from "../utils/DetalleService.js";

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
    const nuevoDetalle = await detalleSvc.crearDetalle(
      idComprobante,
      idTrabajo
    );
    return res.status(201).json(nuevoDetalle);
  } catch (error) {
    return next(error);
  }
};

export const GetDetalleByIdCabecera = async (req, res, next) => {
    const { idComprobanteCabecera } = req.params;
    
    try {
        const detalles = await detalleSvc.getDetalleByIdCabecera(idComprobanteCabecera);
        return res.json(detalles);
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

export const UpdateDetalle = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const detalleActualizado = await detalleSvc.updateDetalle(id, req.body);
        return res.json(detalleActualizado);
    } catch (error) {
        return next(error);
    }
}; 