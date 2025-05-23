import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";
import { allowUpload } from "../middlewares/uploadMiddleware.js";

import { CrearEmpleado, GetEmpleados, ActualizarProfilePic } from "../controllers/empleadosController.js";

router.use(verificarToken);
router.get("/", GetEmpleados);
router.post("/", CrearEmpleado);
router.put("/imagen", allowUpload.single('imagen'), ActualizarProfilePic);

export default router;