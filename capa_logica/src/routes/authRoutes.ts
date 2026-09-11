import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateRegister, validateLogin } from "../middlewares/authValidators";

const router = Router();

// 🔓 Públicas con validación
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// 🔒 Protegida
router.get("/me", authenticate, me);

export default router;