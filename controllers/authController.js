import bcrypt from "bcryptjs";
import { getEmpleadoByEmail } from "../utils/empleadoService.js";
import { generarAccessToken, generarRefreshToken } from "../utils/tokenService.js";

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
  };

  const accessToken = generarAccessToken(datosEncriptados);
  const refreshToken = generarRefreshToken(datosEncriptados);

  res.json({ accessToken, refreshToken });
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token no proporcionado" });
  }

  try {
    const datosEncriptados = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const nuevoAccessToken = generarAccessToken({
      email: datosEncriptados.email,
      rol: datosEncriptados.rol,
      empleadoId: datosEncriptados.empleadoId,
    });

    res.json({ accessToken: nuevoAccessToken });
  } catch (error) {
    return res.status(403).json({ error: "Refresh token inválido o expirado" });
  }
};
