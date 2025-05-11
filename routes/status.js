import express from "express";
const router = express.Router();
import { getStatus } from '../controllers/statusController.js';

router.get('/', getStatus);

export default router;