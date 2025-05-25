import express from "express"
import statusRouter from "./status.js"
import authRouter from "./auth.js"
import empleadosRouter from "./empleados.js"
import comprobantesRouter from "./comprobantes.js"

const router = express.Router();

router.use('/status', statusRouter);
router.use('/auth', authRouter);
router.use('/empleados', empleadosRouter);
router.use('/comprobantes', comprobantesRouter);

export default router;
