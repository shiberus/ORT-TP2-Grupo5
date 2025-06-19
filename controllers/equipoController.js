import * as equipoSvc from "../utils/EquipoService.js";

export const GetEquipos = async (req, res, next) => {
    try {
        const equipos = await equipoSvc.getEquipos();
        return res.json(equipos);
    } catch (error) {
        return next(error);
    }
};

export const GetEquipoById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const equipo = await equipoSvc.getEquipoById(id);
        return res.json(equipo);
    } catch (error) {
        return next(error);
    }
};

export const CrearEquipo = async (req, res, next) => {
    if (!req.body || !req.body.nombre || !req.body.modelo || !req.body.idCliente) {
        return res.status(400).json({ error: "Faltan datos (nombre, modelo, idCliente)" });
    }
    const { nombre, modelo, idCliente } = req.body;
    try {
        const nuevoEquipo = await equipoSvc.crearEquipo(nombre, modelo, idCliente);
        return res.status(201).json(nuevoEquipo);
    } catch (error) {
        return next(error);
    }
};

export const ActualizarEquipo = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const equipoActualizado = await equipoSvc.actualizarEquipo(id, data);
        return res.json(equipoActualizado);
    } catch (error) {
        return next(error);
    }
};

export const EliminarEquipo = async (req, res, next) => {
    const { id } = req.params;
    try {
        const equipoEliminado = await equipoSvc.eliminarEquipo(id);
        return res.json(equipoEliminado);
    } catch (error) {
        return next(error);
    }
}; 