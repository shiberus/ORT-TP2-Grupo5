import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getEmpleadoByEmail } from "../utils/empleadoService.js";

export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Faltan datos (email, password)" });
  }
  const empleado = await getEmpleadoByEmail(req.body.email);
  
  if (!empleado?.activo) {
    return res.status(401).json({ error: "Cuenta inhabilitada" });
  }
  
  const hashedPassword = empleado?.password || "";
  const comparada = await bcrypt.compare(req.body.password, hashedPassword);
  if (!comparada) {
    return res.status(401).json({ error: "Email o contraseña incorrecta" });
  }

  const datosEncriptados = {
    email: empleado.email,
    rol: empleado.rol,
    empleadoId: empleado._id,
  }
  const token = jwt.sign(datosEncriptados, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ accessToken: token });
};
