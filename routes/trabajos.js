import express from 'express'
import { verificarToken } from "../middlewares/authMiddleware.js";
import { GetTrabajos, GetTrabajoById, CreateTrabajo, EliminarTrabajo ,ActualizarTrabajo } from '../controllers/trabajoController.js'


const router = express.Router()

router.get('/:id',GetTrabajoById)

router.use(verificarToken);

router.get('/', GetTrabajos)
router.post('/', CreateTrabajo)
router.put("/:id", ActualizarTrabajo);
router.delete("/:id", EliminarTrabajo); 

export default router