import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Reservation from "../models/Reservation";
import Event from "../models/Event";
import Ticket from "../models/Ticket";

// GET /reservations  →  Reservas del usuario autenticado
export const getMyReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const reservations = await Reservation.findAll({
      where: { userId },
      include: [
        {
          association: "event",
          attributes: ["id", "name", "date", "location", "price"],
        },
        { association: "tickets", attributes: ["id", "ticketCode", "status"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ count: reservations.length, reservations });
  } catch (error) {
    console.error("Error en getMyReservations:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /reservations/:id  →  Detalle de una reserva (solo el dueño o admin)
export const getReservationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // 👈 fix
    const { id: userId, role } = req.user!;

    const reservation = await Reservation.findByPk(id, {
      include: [
        { association: "event" },
        { association: "tickets" },
        { association: "user", attributes: ["id", "name", "email"] },
      ],
    });

    if (!reservation) {
      res.status(404).json({ message: "Reserva no encontrada" });
      return;
    }

    if (reservation.userId !== userId && role !== "admin") {
      res.status(403).json({ message: "No tienes permisos para ver esta reserva" });
      return;
    }

    res.json({ reservation });
  } catch (error) {
    console.error("Error en getReservationById:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /reservations  →  Crear reserva
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { eventId, quantity } = req.body;

    // 1. Verificar evento
    const event = await Event.findByPk(eventId);
    if (!event) {
      res.status(404).json({ message: "Evento no encontrado" });
      return;
    }

    // 2. Verificar fecha futura
    if (new Date(event.date) <= new Date()) {
      res.status(400).json({ message: "No puedes reservar para un evento pasado" });
      return;
    }

    // 3. Verificar capacidad disponible
    const reservedCount = await Reservation.sum("quantity", {
      where: {
        eventId,
        status: ["pending", "confirmed"],
      },
    });

    const alreadyReserved = reservedCount || 0;
    const available = event.capacity - alreadyReserved;

    if (quantity > available) {
      res.status(400).json({
        message: `No hay suficientes entradas disponibles. Disponibles: ${available}`,
      });
      return;
    }

    // 4. Calcular total
    const total = parseFloat(event.price.toString()) * quantity;

    // 5. Crear reserva
    const reservation = await Reservation.create({
      userId,
      eventId,
      quantity,
      total,
      status: "pending",
    });

    res.status(201).json({
      message: "Reserva creada correctamente",
      reservation,
    });
  } catch (error) {
    console.error("Error en createReservation:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /reservations/:id  →  Confirmar o cancelar reserva
export const updateReservationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // 👈 fix
    const { id: userId, role } = req.user!;
    const { status } = req.body;

    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      res.status(404).json({ message: "Reserva no encontrada" });
      return;
    }

    if (reservation.userId !== userId && role !== "admin") {
      res.status(403).json({ message: "No tienes permisos sobre esta reserva" });
      return;
    }

    if (reservation.status === "cancelled") {
      res.status(400).json({ message: "No se puede modificar una reserva cancelada" });
      return;
    }

    // Si se confirma, generar tickets
    if (status === "confirmed" && reservation.status !== "confirmed") {
      const tickets = [];
      for (let i = 0; i < reservation.quantity; i++) {
        tickets.push({
          reservationId: reservation.id,
          ticketCode: `TKT-${uuidv4().slice(0, 8).toUpperCase()}`,
          status: "valid" as const,
        });
      }
      await Ticket.bulkCreate(tickets);
    }

    await reservation.update({ status });

    res.json({
      message: `Reserva ${status === "confirmed" ? "confirmada" : "actualizada"} correctamente`,
      reservation,
    });
  } catch (error) {
    console.error("Error en updateReservationStatus:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /reservations/:id  →  Cancelar reserva
export const cancelReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // 👈 fix
    const { id: userId, role } = req.user!;

    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      res.status(404).json({ message: "Reserva no encontrada" });
      return;
    }

    if (reservation.userId !== userId && role !== "admin") {
      res.status(403).json({ message: "No tienes permisos sobre esta reserva" });
      return;
    }

    if (reservation.status === "cancelled") {
      res.status(400).json({ message: "La reserva ya está cancelada" });
      return;
    }

    await reservation.update({ status: "cancelled" });
    await Ticket.update(
      { status: "cancelled" },
      { where: { reservationId: reservation.id } },
    );

    res.json({ message: "Reserva cancelada correctamente" });
  } catch (error) {
    console.error("Error en cancelReservation:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};