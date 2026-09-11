import { Router } from "express";
import {
  getMyReservations,
  getReservationById,
  createReservation,
  updateReservationStatus,
  cancelReservation,
} from "../controllers/reservationController";
import { authenticate } from "../middlewares/authMiddleware";
import {
  validateCreateReservation,
  validateUpdateReservation,
  validateReservationId,
} from "../middlewares/reservationValidators";

const router = Router();

router.use(authenticate);

router.get("/", getMyReservations);
router.get("/:id", validateReservationId, getReservationById);
router.post("/", validateCreateReservation, createReservation);
router.put("/:id", validateUpdateReservation, updateReservationStatus);
router.delete("/:id", validateReservationId, cancelReservation);

export default router;