import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";
import { allowUpload } from "../middlewares/uploadMiddleware.js";
import { validateId } from "../middlewares/validateObjectId.js";

import { CrearEmpleado, GetEmpleados, GetEmpleadoById, ActualizarProfilePic, BajaEmpleado, ActualizarEmpleado } from "../controllers/empleadosController.js";

router.use(verificarToken);
router.get("/", GetEmpleados);
router.get("/:id", validateId, GetEmpleadoById);
router.delete("/:id", validateId, BajaEmpleado);
router.post("/", CrearEmpleado);
router.put("/imagen", allowUpload.single('imagen'), ActualizarProfilePic);
router.put("/:id", validateId, ActualizarEmpleado);

export default router;