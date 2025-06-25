import Empleado from "../models/Empleado.js";
import bcrypt from "bcryptjs";
import ROLES from "../constants/roles.js";
import CustomError from "./CustomError.js";
import * as val from './Validador.js';
import { uploadFile } from "./supabaseService.js";

const validarEmpleado = (nombre, email, password, rol) => {
  if (!val.validarString(nombre, 3, 20)) {
    throw new CustomError('El nombre debe tener entre 3 y 20 caracteres', 400);
  }
  if (!val.validarEmail(email)) {
    throw new CustomError('El email ingresado es invalido', 400);
  }
  if (!val.validarPassword(password)) {
    throw new CustomError('La contraseña debe tener entre 8 y 16 caracteres, y al menos un numero y una mayuscula');
  }
  if (!ROLES[rol]) {
    throw new CustomError(`El rol '${rol}' es invalido`, 400);
  }
};

export const crearEmpleado = async (nombre, email, password, rol) => {
  validarEmpleado(nombre, email, password, rol);

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const empleado = {
    nombre,
    email,
    password: hashedPassword,
    rol: ROLES[rol],
  };

  const nuevoEmpleado = await Empleado.create(empleado).catch(() => {
    throw new CustomError("Error al crear Empleado", 500);
  });

  return nuevoEmpleado;
};

export const getEmpleados = async (query = {}) => {
  const empleados = await Empleado.find(query).catch((error) => {
    console.error("Error: ", error);
  });
  return empleados;
};

export const getEmpleadoById = async (empleadoId) => {
  const empleado = await Empleado.findById(empleadoId).catch((error) => {
    console.error("Error: ", error);
  });
  return empleado;
};

export const getEmpleadoByEmail = async (email) => {
  const empleado = await Empleado.findOne({ email }).catch((error) => {
    console.error("Error: ", error);
  });
  return empleado;
};

export const actualizarProfilePic = async (empleadoId, imagen) => {
  const imageUrl = await uploadFile(
    `empleados/${empleadoId}/profilePic`,
    imagen
  );

  const empleado = await Empleado.findByIdAndUpdate(
    empleadoId,
    { profile_pic: imageUrl },
    { new: true }
  );

  return empleado;
};

export const bajaEmpleado = async (empleadoId) => {
  const empleado = await Empleado.findByIdAndUpdate(
    empleadoId,
    { activo: false },
    { new: true }
  );

  return empleado;
};

export const actualizarEmpleado = async (empleadoId, actualizacion) => {
  const { nombre, password } = actualizacion;

  if (!nombre && !password) {
    throw new CustomError('Debe enviar al menos uno de los siguientes campos para actualizar: nombre o password.', 422);
  }

  const datosAActualizar = {};

  if (nombre !== undefined) {
    if (!val.validarString(nombre, 3, 20)) {
      throw new CustomError('El nombre debe tener entre 3 y 20 caracteres', 400);
    }
    datosAActualizar.nombre = nombre;
  }

  if (password !== undefined) {
    if (!val.validarPassword(password)) {
      throw new CustomError('La contraseña debe tener entre 8 y 16 caracteres, y al menos un número y una mayúscula', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    datosAActualizar.password = hashedPassword;
  }

  const empleadoActualizado = await Empleado.findByIdAndUpdate(
    empleadoId,
    { $set: datosAActualizar },
    { new: true, runValidators: true }
  );

  if (!empleadoActualizado) {
    throw new CustomError('Empleado no encontrado', 404);
  }

  return empleadoActualizado;
};
