import ComprobanteDetalle from "../models/ComprobanteDetalle.js";
import CustomError from "./CustomError.js";
import Comprobante from "../models/Comprobante.js";


export const crearDetalle = async (idTrabajo, idComprobante) => {
  try {
    const detalle = { idTrabajo, idComprobante };
    const nuevoDetalle = await ComprobanteDetalle.create(detalle);
    return nuevoDetalle;
  } catch (error) {
    throw new CustomError(`Error al crear el detalle: ${error.message}`, 500);
  }
};

export const getDetalles = async (query = {}) => {
  try {
    const comprobantes = await ComprobanteDetalle.find(query); 
    return comprobantes;
  } catch (error) {
    throw new CustomError("Error al obtener los comprobantes", 500);
  }
};

export const getDetalleById = async (idDetalle) => {
  try {
    const comprobante = await ComprobanteDetalle.findById(idDetalle);
    if (!comprobante) {
      throw new CustomError("Detalle de comprobante no encontrado", 404);
    }
    return comprobante;
  } catch (error) {
    throw new CustomError("Error al obtener el detalle", 500);
  }
};

export const getDetalleWithTrabajoByIdCabecera = async (idComprobanteCabecera) => {
  const comprobante = await Comprobante.findById(idComprobanteCabecera);
  if (!comprobante) {
    throw new CustomError("Comprobante no encontrado", 404);
  }


  const comprobantesDetalle = await ComprobanteDetalle.find({
    idComprobante: idComprobanteCabecera
  })
    .populate({
      path: "idTrabajo",
      select: "estado descripcion costo idEmpleado idEquipo",
      populate: [
        { path: "idEmpleado", select: "_id nombre" },
        { path: "idEquipo", select: "_id nombre modelo idCliente" }
      ]
    })
    .catch((error) => {
      console.error("Error: ", error);
      throw new CustomError("Error al obtener los detalles del comprobante con información de trabajo", 500);
    });

  if (comprobantesDetalle.length === 0) {
    throw new CustomError("No se encontraron detalles en el comprobante", 404);
  }

  //si esta finalizado, calcular costo total
  let costoTotal = null;
  if (comprobante.finalizado) {
    costoTotal = comprobantesDetalle.reduce((acc, detalle) => {
      const costo = detalle.idTrabajo?.costo || 0;
      return acc + costo;
    }, 0);
  }


  return {
    detalles: comprobantesDetalle,
    finalizado: comprobante.finalizado,
    costoTotal,
  };
};

