import express from 'express'
import { verificarToken } from "../middlewares/authMiddleware.js";

import { GetTrabajos, GetTrabajoById, CreateTrabajo, ActualizarTrabajo, FinalizarTrabajo, AsignarEmpleado, AsignarComponente, AsignarCosto } from '../controllers/trabajoController.js'


const router = express.Router()


router.use(verificarToken);

router.get('/:id',GetTrabajoById)
router.get('/', GetTrabajos)
router.post('/crearTrabajo', CreateTrabajo)
router.put("/:id", ActualizarTrabajo);
router.put("/asignarTrabajo/:id", AsignarEmpleado);
router.put("/costo/:id", AsignarCosto);
router.put("/asignarComponente/:id", AsignarComponente);
router.put("/finalizarTrabajo/:id", FinalizarTrabajo);



export default router