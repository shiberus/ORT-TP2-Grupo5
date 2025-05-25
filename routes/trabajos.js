import express from 'express'
import { getTrabajos, getTrabajoById, createTrabajo, deleteTrabajo,updateTrabajo } from '../controllers/trabajoController.js'


const router = express.Router()

router.get('/', getTrabajos)
router.post('/', createTrabajo)
router.get('/:id',getTrabajoById)
router.put("/:id", updateTrabajo);
router.delete("/:id", deleteTrabajo); 

export default router