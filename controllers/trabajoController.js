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


export const AsignarEmpleado = async (req, res, next) => {
    try {
        const { idEmpleado } = req.body;
        const trabajoConEmpleado = await trabajoSvc.asignarEmpleado(req.params.id, idEmpleado);
        
        return res.json(trabajoConEmpleado);

    } catch (error) {
        next(error)
    }
}

export const AsignarCosto = async (req, res, next) => {
    try {
        const { costo, descripcion} = req.body;
        const trabajoCosto = await trabajoSvc.asignarCosto(req.params.id, costo, descripcion)

        return res.json(trabajoCosto)

    } catch (error) {
        next(error)
    }
}

export const AsignarComponente = async (req, res, next) => {
    try {
        const { idComponente } = req.body;
        const { id } = req.params;         

        const trabajoActualizado = await trabajoSvc.asignarComponente(id, idComponente);

        return res.json(trabajoActualizado);

    } catch (error) {
        next(error); 
    }
};

export const FinalizarTrabajo = async (req, res, next) => {
    try {
        const trabajoFinalizado = await trabajoSvc.finalizarTrabajo(req.params.id);
        return res.json(trabajoFinalizado);
    } catch (error) {
        next(error);
    }
};
