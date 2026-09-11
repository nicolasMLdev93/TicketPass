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

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Obtiene las reservas del usuario autenticado
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get("/", getMyReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obtiene una reserva por ID
 *     tags: [Reservations]
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
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reserva no encontrada
 */
router.get("/:id", validateReservationId, getReservationById);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Reserva creada
 *       400:
 *         description: Datos inválidos
 */
router.post("/", validateCreateReservation, createReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Actualiza el estado de una reserva
 *     tags: [Reservations]
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
 *                 example: "confirmed"
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: Reserva no encontrada
 */
router.put("/:id", validateUpdateReservation, updateReservationStatus);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Cancela una reserva
 *     tags: [Reservations]
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
 *         description: Reserva cancelada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete("/:id", validateReservationId, cancelReservation);

export default router;