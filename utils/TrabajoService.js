// utils/trabajoService.js
import Trabajo from "../models/Trabajo.js";
import CustomError from "./CustomError.js";
import { estados } from "../constants/trabajosEnum.js";

export const getTrabajos = async () => {
    return await Trabajo.find();
    };

    export const getTrabajoById = async (id) => {
    const trabajo = await Trabajo.findById(id);
    if (!trabajo) throw new CustomError("Trabajo no encontrado", 404);
    return trabajo;
};

export const createTrabajo = async ({ categoria, descripcion, costo, idEquipo, idEmpleado, idComponente }) => {
    if (!categoria || !costo || !idEquipo) {
        throw new CustomError("Faltan datos obligatorios", 400);
    }

    const trabajoData = {
        categoria,
        estado: estados.pendiente,
        costo,
        idEquipo,
    };

    if (descripcion) trabajoData.descripcion = descripcion;
    if (idEmpleado) trabajoData.idEmpleado = idEmpleado;
    if (idComponente) trabajoData.idComponente = idComponente;

    return await Trabajo.create(trabajoData);
};

export const updateTrabajo = async (id, data) => {
    const actualizado = await Trabajo.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!actualizado) throw new CustomError("Trabajo no encontrado", 404);
    return actualizado;
};

