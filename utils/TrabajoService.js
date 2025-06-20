// utils/trabajoService.js
import Trabajo from "../models/Trabajo.js";
import CustomError from "./CustomError.js";
import { estados } from "../constants/trabajosEnum.js";
import Empleado from "../models/Empleado.js"
import Componente from "../models/Componente.js";

export const getTrabajos = async () => {
    return await Trabajo.find();
    };

export const getTrabajoById = async (id) => {
    const trabajo = await Trabajo.findById(id);
    if (!trabajo) throw new CustomError("Trabajo no encontrado", 404);
    return trabajo;
};

export const createTrabajo = async ({ idEquipo }) => {
    if (!idEquipo) {
        throw new CustomError("Faltan datos obligatorios", 400);
    }

    const trabajoData = {
        //categoria,
        estado: estados.pendiente,
        idEmpleado: null,
        idComponente: null,
        costo: null,
        idEquipo,
    };


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

export const asignarEmpleado = async (id, idEmpleado) => {
    const trabajo = await Trabajo.findById(id);
    const empleado = await Empleado.findById(idEmpleado);
    
    if (!trabajo) throw new CustomError("El trabajo no existe", 404);
    if (!empleado || empleado.activo === false) throw new CustomError("Empleado no encontrado o inactivo", 409);

    trabajo.idEmpleado = empleado._id; 
    trabajo.estado = estados.enProceso; 

    await trabajo.save(); 

    return trabajo; 
};

export const asignarCosto = async (id, costo, descripcion) => {

    const trabajo = await Trabajo.findById(id);

    if (!trabajo) throw new CustomError("El trabajo no existe", 404);
    if(trabajo.estado === estados.pendiente) throw new CustomError("El trabajo no tiene asignado ningun empleado aun", 405)
    if (costo == null || costo < 0) {
        throw new CustomError("El costo debe ser un número válido", 400);
    }

    trabajo.costo = costo;
    trabajo.descripcion = descripcion;

    await trabajo.save();
    return trabajo;
    
}

export const asignarComponente = async (id, idComponente) => {

    const trabajo = await Trabajo.findById(id);
    const componente = await Componente.findById(idComponente);

    if (!componente) throw new CustomError("El componente no existe", 404);
    if (!trabajo) throw new CustomError("El trabajo no existe", 404);
    if(trabajo.estado === estados.pendiente) throw new CustomError("El trabajo no tiene asignado ningun empleado aun", 405)

    if (trabajo.costo === null) 
        throw new CustomError("El costo de mano de obra no fue asignado aún. Asignalo antes de agregar el componente.", 406);

    trabajo.idComponente = componente._id;
    trabajo.costo += componente.costo;

    await trabajo.save();
    return trabajo;
    
}

export const finalizarTrabajo = async (id) => {
    const trabajo = await Trabajo.findById(id);

    if (!trabajo) throw new CustomError("Trabajo no encontrado", 404);

    if (!trabajo.idEmpleado) 
        throw new CustomError("El trabajo no tiene un empleado asignado", 400);

    if (trabajo.costo === null) 
        throw new CustomError("El trabajo no tiene un costo asignado", 400);

    if (trabajo.estado === estados.finalizado) 
        throw new CustomError("El trabajo ya está finalizado", 400);

    trabajo.estado = estados.finalizado;

    await trabajo.save();

    return trabajo;
};
