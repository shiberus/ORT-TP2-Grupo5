import express from "express";
const router = express.Router();
import { verificarToken } from "../middlewares/authMiddleware.js";

import { 
    CrearCliente, 
    GetClientes, 
    GetClienteById 
} from "../controllers/clientesController.js";

router.use(verificarToken);
router.get("/", GetClientes);
router.get("/:id", GetClienteById);
router.post("/", CrearCliente);

export default router; 