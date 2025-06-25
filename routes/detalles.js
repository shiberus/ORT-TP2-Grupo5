import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { 
    GetDetalles, 
    GetDetalleById,
    CrearDetalle,
    GetDetalleWithTrabajoByIdCabecera
} from "../controllers/detallesController.js";

router.use(verificarToken);

router.get("/", GetDetalles);
router.get("/:id", GetDetalleById); 
router.get("/comprobante/:idComprobanteCabecera", GetDetalleWithTrabajoByIdCabecera);
router.post("/", CrearDetalle); 

export default router;
