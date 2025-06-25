import * as componenteSvc from "../utils/ComponenteService.js";

export const GetComponentes = async (req, res, next) => {
    try {
        const componentes = await componenteSvc.getComponentes();
        return res.json(componentes);
    } catch (error) {
        return next(error);
    }
    };

    export const GetComponenteById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const componente = await componenteSvc.getComponenteById(id);
        return res.json(componente);
    } catch (error) {
        return next(error);
    }
    };

    export const CrearComponente = async (req, res, next) => {
    if (!req.body || !req.body.nombre || req.body.costo == null) {
        return res.status(400).json({ error: "Faltan datos (nombre, costo)" });
    }

    const { nombre, costo } = req.body;

    try {
        const nuevoComponente = await componenteSvc.crearComponente(nombre, costo);
        return res.status(201).json(nuevoComponente);
    } catch (error) {
        return next(error);
    }
    };

    export const ActualizarComponente = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const componenteActualizado = await componenteSvc.actualizarComponente(id, data);
        return res.json(componenteActualizado);
    } catch (error) {
        return next(error);
    }
};
