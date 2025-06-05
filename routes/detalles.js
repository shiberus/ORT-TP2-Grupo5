import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { 
    CrearDetalle, 
    GetDetalles, 
    GetDetalleById,
    CrearEquipo,
} from "../controllers/detallesController.js";

router.use(verificarToken);
router.get("/", GetDetalles);
router.get("/:id", GetDetalleById);
router.post("/", CrearDetalle);

export default router; 