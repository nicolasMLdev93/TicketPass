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

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Obtiene los tickets del usuario autenticado
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
router.get("/", getMyTickets);

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Obtiene un ticket por ID
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket no encontrado
 */
router.get("/:id", validateTicketId, getTicketById);

/**
 * @swagger
 * /tickets/{id}/validate:
 *   put:
 *     summary: Valida un ticket (solo admin)
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket validado correctamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Ticket no encontrado
 */
router.put("/:id/validate", authorize("admin"), validateTicketId, validateTicket);

/**
 * @swagger
 * /tickets/{id}/status:
 *   put:
 *     summary: Actualiza el estado de un ticket (solo admin)
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "used"
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Ticket no encontrado
 */
router.put(
  "/:id/status",
  authorize("admin"),
  validateUpdateTicketStatus,
  updateTicketStatus,
);

export default router;