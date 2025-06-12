import express from 'express'
import { verificarToken } from "../middlewares/authMiddleware.js";
import { GetTrabajos, GetTrabajoById, CreateTrabajo, ActualizarTrabajo } from '../controllers/trabajoController.js'


const router = express.Router()


router.use(verificarToken);

router.get('/:id',GetTrabajoById)
router.get('/', GetTrabajos)
router.post('/', CreateTrabajo)
router.put("/:id", ActualizarTrabajo);

export default router