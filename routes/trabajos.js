import express from 'express'
import { verificarToken } from "../middlewares/authMiddleware.js";

import { GetTrabajos, GetTrabajoById, CreateTrabajo, ActualizarTrabajo, AvanzarEstadoTrabajo } from '../controllers/trabajoController.js'


const router = express.Router()


router.use(verificarToken);

router.get('/:id',GetTrabajoById)
router.get('/', GetTrabajos)
router.post('/', CreateTrabajo)
router.put("/:id", ActualizarTrabajo);
router.put("/:id", AvanzarEstadoTrabajo);


export default router