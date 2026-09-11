import { Router } from "express";
import {
  getMyTickets,
  getTicketById,
  validateTicket,
  updateTicketStatus,
} from "../controllers/ticketController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import {
  validateTicketId,
  validateUpdateTicketStatus,
} from "../middlewares/ticketValidators";

const router = Router();

router.use(authenticate);

router.get("/", getMyTickets);
router.get("/:id", validateTicketId, getTicketById);

router.put("/:id/validate", authorize("admin"), validateTicketId, validateTicket);
router.put(
  "/:id/status",
  authorize("admin"),
  validateUpdateTicketStatus,
  updateTicketStatus,
);

export default router;