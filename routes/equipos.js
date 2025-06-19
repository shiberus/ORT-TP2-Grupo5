import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { 
    CrearEquipo, 
    GetEquipos, 
    GetEquipoById,
    ActualizarEquipo,
    EliminarEquipo
} from "../controllers/equipoController.js";

router.use(verificarToken);
router.get("/", GetEquipos);
router.get("/:id", GetEquipoById);
router.post("/", CrearEquipo);
router.put("/:id", ActualizarEquipo);
router.delete("/:id", EliminarEquipo);

export default router; 