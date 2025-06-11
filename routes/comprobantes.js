import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { 
    CrearComprobante, 
    GetComprobantes, 
    GetComprobanteById 
} from "../controllers/comprobantesController.js";

router.get("/:id", GetComprobanteById);
router.use(verificarToken);
router.get("/", GetComprobantes);
router.post("/", CrearComprobante);

export default router; 