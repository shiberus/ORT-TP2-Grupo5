import * as empleadoSvc from "../utils/empleadoService.js";

export const GetEmpleados = async (req, res) => {
  const empleados = await empleadoSvc.getEmpleados();
  return res.json(empleados);
};

export const CrearEmpleado = async (req, res, next) => {
  if (
    !req.body ||
    !req.body.nombre ||
    !req.body.rol ||
    !req.body.email ||
    !req.body.password
  ) {
    return res
      .status(400)
      .json({ error: "Faltan datos (nombre, email, password, rol)" });
  }
  const { nombre, rol, email, password } = req.body;

  let nuevoEmpleado;
  try {
    nuevoEmpleado = await empleadoSvc.crearEmpleado(
      nombre,
      email,
      password,
      rol
    );
  } catch (error) {
    return next(error);
  }

  return res.status(201).json(nuevoEmpleado);
};

export const ActualizarProfilePic = async (req, res, next) => {
  const { usuario } = req;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No se proporciono ninguna imagen" });
  }

  try {
    const empleadoActualizado = await empleadoSvc.actualizarProfilePic(
      usuario.empleadoId,
      file
    );

    return res.json({
      msg: "Imagen actualizada correctamente",
      alumno: empleadoActualizado,
    });
  } catch (error) {
    next(error);
  }
};
