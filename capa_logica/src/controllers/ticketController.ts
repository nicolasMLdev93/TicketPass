import { Request, Response } from "express";
import Ticket from "../models/Ticket";

// GET /tickets  →  Tickets del usuario autenticado
export const getMyTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const tickets = await Ticket.findAll({
      include: [
        {
          association: "reservation",
          where: { userId },
          attributes: ["id", "eventId", "quantity", "total", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ count: tickets.length, tickets });
  } catch (error) {
    console.error("Error en getMyTickets:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /tickets/:id  →  Detalle de un ticket
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // 👈 fix
    const { id: userId, role } = req.user!;

    const ticket = await Ticket.findByPk(id, {
      include: [
        {
          association: "reservation",
          attributes: ["id", "userId", "eventId", "quantity", "total", "status"],
        },
      ],
    });

    if (!ticket) {
      res.status(404).json({ message: "Ticket no encontrado" });
      return;
    }

    // 👇 chequeo defensivo
    if (!ticket.reservation) {
      res.status(404).json({ message: "Reserva asociada no encontrada" });
      return;
    }

    if (ticket.reservation.userId !== userId && role !== "admin") {
      res.status(403).json({ message: "No tienes permisos para ver este ticket" });
      return;
    }

    res.json({ ticket });
  } catch (error) {
    console.error("Error en getTicketById:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /tickets/:id/validate  →  Marcar ticket como usado (admin)
export const validateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // 👈 fix

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      res.status(404).json({ message: "Ticket no encontrado" });
      return;
    }

    if (ticket.status === "used") {
      res.status(400).json({ message: "Este ticket ya fue utilizado" });
      return;
    }

    if (ticket.status === "cancelled") {
      res.status(400).json({ message: "Este ticket está cancelado" });
      return;
    }

    await ticket.update({ status: "used" });

    res.json({
      message: "Ticket validado correctamente",
      ticket,
    });
  } catch (error) {
    console.error("Error en validateTicket:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /tickets/:id/status  →  Cambiar status (admin)
export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // 👈 fix
    const { status } = req.body;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      res.status(404).json({ message: "Ticket no encontrado" });
      return;
    }

    await ticket.update({ status });

    res.json({
      message: "Ticket actualizado correctamente",
      ticket,
    });
  } catch (error) {
    console.error("Error en updateTicketStatus:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};