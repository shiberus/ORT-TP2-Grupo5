import express from "express";
const router = express.Router();
import { login, refreshToken } from "../controllers/authController.js";

router.post("/", login);
router.post("/refresh", refreshToken);

export default router;
