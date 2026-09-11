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

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obtiene todos los eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Obtiene un evento por ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento no encontrado
 */
router.get("/:id", validateEventId, getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Crea un nuevo evento (solo admin)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento creado
 *       403:
 *         description: No autorizado (requiere rol admin)
 */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateCreateEvent,
  createEvent,
);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualiza un evento existente (solo admin)
 *     tags: [Events]
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
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Evento no encontrado
 */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateEvent,
  updateEvent,
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Elimina un evento (solo admin)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento eliminado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Evento no encontrado
 */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateEventId,
  deleteEvent,
);

export default router;