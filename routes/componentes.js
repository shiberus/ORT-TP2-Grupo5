import express from "express";
const router = express.Router();

import { verificarToken } from "../middlewares/authMiddleware.js";
import {
    CrearComponente,
    GetComponentes,
    GetComponenteById,
    ActualizarComponente,
} from "../controllers/componentesController.js";

router.use(verificarToken);

router.get("/", GetComponentes);
router.get("/:id", GetComponenteById);
router.post("/", CrearComponente);
router.put("/:id", ActualizarComponente);

export default router;
