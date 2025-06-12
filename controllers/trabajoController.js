import * as trabajoSvc from "../utils/TrabajoService.js";
import { ESTADOS_TRABAJO } from "../constants/trabajosEnum.js";

export const GetTrabajos = async (req, res, next) => {
    try {
        const trabajos = await trabajoSvc.getTrabajos();
        return res.json(trabajos);
    } catch (error) {
        next(error);
    }
};

export const CreateTrabajo = async (req, res, next) => {
    try {
        const nuevoTrabajo = await trabajoSvc.createTrabajo(req.body);
        return res.status(201).json(nuevoTrabajo);
    } catch (error) {
        next(error);
    }
};

export const GetTrabajoById = async (req, res, next) => {
    try {
        const trabajo = await trabajoSvc.getTrabajoById(req.params.id);
        return res.json(trabajo);
    } catch (error) {
        next(error);
    }
};

export const ActualizarTrabajo = async (req, res, next) => {
    try {
        const actualizado = await trabajoSvc.updateTrabajo(req.params.id, req.body);
        return res.json(actualizado);
    } catch (error) {
        next(error);
    }
};

export const EliminarTrabajo = async (req, res, next) => {
    try {
        await trabajoSvc.deleteTrabajo(req.params.id);
        return res.json({ mensaje: "Trabajo eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

export const AvanzarEstadoTrabajo = async (req, res, next) => {
    try {
        const trabajo = await trabajoSvc.getTrabajoById(req.params.id);
        const estadoActual = trabajo.estado;
        const indiceActual = ESTADOS_TRABAJO.indexOf(estadoActual);
        
        if (indiceActual === ESTADOS_TRABAJO.length - 1) {
            return res.status(400).json({ 
                mensaje: "El trabajo ya está en su estado final" 
            });
        }
        
        const siguienteEstado = ESTADOS_TRABAJO[indiceActual + 1];
        const actualizado = await trabajoSvc.updateTrabajo(req.params.id, { estado: siguienteEstado });
        return res.json(actualizado);
    } catch (error) {
        next(error);
    }
};