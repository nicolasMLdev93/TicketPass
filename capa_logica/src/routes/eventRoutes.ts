import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import {
  validateCreateEvent,
  validateUpdateEvent,
  validateEventId,
} from "../middlewares/eventValidators";

const router = Router();

// 🔓 Rutas públicas (sin middleware)
router.get("/", getAllEvents);
router.get("/:id", validateEventId, getEventById);

// 👑 Rutas solo para admins autenticados
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateCreateEvent,
  createEvent,
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateEvent,
  updateEvent,
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateEventId,
  deleteEvent,
);

export default router;