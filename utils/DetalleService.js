import ComprobanteDetalle from "../models/ComprobanteDetalle.js";
import CustomError from "./CustomError.js";
import Trabajo from "../models/Trabajo.js";
import { Types } from "mongoose";
import { populate } from "dotenv";

export const crearDetalle = async (idTrabajo, idComprobante) => {
  try {
    const detalle = {
      idTrabajo,
      idComprobante,
    };

    const nuevoDetalle = await ComprobanteDetalle.create(detalle).catch(() => {
      throw new CustomError("Error al crear Detalle", 500);
    });

    return nuevoDetalle;
  } catch (error) {
    throw new CustomError(`Error al crear el detalle: ${error.message}`, 500);
  }
};

export const getDetalles = async (query = {}) => {
  const comprobantes = await ComprobanteDetalle.find(query)
    .populate({
      path: "idTrabajo",
      populate: {
        path: "idEquipo",
      },
    })
    .catch((error) => {
      console.error("Error: ", error);
      throw new CustomError("Error al obtener los comprobantes", 500);
    });

  const detalle = await ComprobanteDetalle.findOne();
  const trabajo = await Trabajo.findById(detalle.idTrabajo);
  console.log({ trabajo, detalle });

  return comprobantes;
};

export const getDetalleById = async (idDetalle) => {
  const comprobante = await ComprobanteDetalle.findById(idDetalle)
    .populate("idTrabajo")
    .catch((error) => {
      console.error("Error: ", error);
      throw new CustomError("Error al obtener el detalle de comprobante", 500);
    });

  if (!comprobante) {
    throw new CustomError("Detalle de comprobante no encontrado", 404);
  }

  return comprobante;
};

export const getDetalleByIdCabecera = async (idComprobanteCabecera) => {
  const comprobantesDetalle = await ComprobanteDetalle.find({
    idComprobante: idComprobanteCabecera
  }).catch((error) => {
    console.error("Error: ", error);
    throw new CustomError("Error al obtener los detalles del comprobante", 500)});

  if(comprobantesDetalle.length === 0){
        throw new CustomError('No se encontraron detalles en el comprobante', 404);
  }

  return comprobantesDetalle;
};

export const getDetalleWithTrabajoByIdCabecera = async (idComprobanteCabecera) => {
  const comprobantesDetalle = await ComprobanteDetalle.find({
      idComprobante: idComprobanteCabecera
  })
  .populate('idTrabajo')
  .catch((error) => {
      console.error("Error: ", error);
      throw new CustomError("Error al obtener los detalles del comprobante con información de trabajo", 500);
  });

  if(comprobantesDetalle.length === 0){
      throw new CustomError('No se encontraron detalles en el comprobante', 404);
  }

  return comprobantesDetalle;
};

export const updateDetalle = async (idDetalle, updateData) => {
    const detalleActualizado = await ComprobanteDetalle.findByIdAndUpdate(
        idDetalle,
        updateData,
        { new: true, runValidators: true }
    );

    if (!detalleActualizado) {
        throw new CustomError("Detalle no encontrado", 404);
    }

    return detalleActualizado;
};