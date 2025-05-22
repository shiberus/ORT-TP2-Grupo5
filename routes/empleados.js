import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { CrearEmpleado, GetEmpleados } from "../controllers/empleadosController.js";

router.get("/", verificarToken, GetEmpleados);
router.post("/", CrearEmpleado);

export default router;