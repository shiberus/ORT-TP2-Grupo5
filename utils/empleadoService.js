import Empleado from "../models/Empleado.js";
import bcrypt from "bcryptjs";
import ROLES from "../constants/roles.js";
import CustomError from "./CustomError.js";

export const crearEmpleado = async (nombre, email, password, rol) => {
  if (!ROLES[rol]) {
    throw new CustomError(`El rol '${rol}' es invalido`, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const empleado = {
    nombre,
    email,
    password: hashedPassword,
    rol: ROLES[rol],
  };

  const nuevoEmpleado = await Empleado.create(empleado).catch((error) => {
    throw new CustomError("Error al crear Empleado", 500);
  });

  return nuevoEmpleado;
};

export const getEmpleados = async (query = {}) => {
  const empleados = await Empleado.find(query).catch((error) => {
    console.error("Error: ", error);
  });
  return empleados;
}

export const getEmpleadoByEmail = async (email) => {
  const empleado = await Empleado.findOne({email}).catch((error) => {
    console.error("Error: ", error);
  });
  return empleado;
};