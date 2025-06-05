import express from "express"
import statusRouter from "./status.js"
import authRouter from "./auth.js"
import empleadosRouter from "./empleados.js"
import trabajosRouter from "./trabajos.js"
import comprobantesRouter from "./comprobantes.js"
import deteallesRouter from "./detalles.js"

const router = express.Router();

router.use('/status', statusRouter);
router.use('/auth', authRouter);
router.use('/empleados', empleadosRouter);
router.use('/trabajos', trabajosRouter)
router.use('/comprobantes', comprobantesRouter);
router.use('/detalles', deteallesRouter);

export default router;
