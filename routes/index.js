import express from "express"
import statusRouter from "./status.js"

const router = express.Router();

router.use('/status', statusRouter);

export default router;
