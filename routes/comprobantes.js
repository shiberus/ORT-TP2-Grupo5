import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { 
    CrearComprobante, 
    GetComprobantes, 
    GetComprobanteById,
    FinalizarComprobante
} from "../controllers/comprobantesController.js";

router.use(verificarToken);
router.get("/", GetComprobantes);
router.get("/:id", GetComprobanteById);
router.post("/", CrearComprobante);
router.put("/:id", FinalizarComprobante);

export default router; 