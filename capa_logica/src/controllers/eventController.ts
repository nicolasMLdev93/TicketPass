import { Request, Response } from "express";
import Event from "../models/Event";

// GET /events
export const getAllEvents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const events = await Event.findAll({ order: [["date", "ASC"]] });
    res.json({ count: events.length, events });
  } catch (error) {
    console.error("Error en getAllEvents:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /events/:id
export const getEventById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findByPk(req.params.id as string);

    if (!event) {
      res.status(404).json({ message: "Evento no encontrado" });
      return;
    }

    res.json({ event });
  } catch (error) {
    console.error("Error en getEventById:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /events  (admin)
export const createEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, location, date, price, capacity, image } =
      req.body;

    const event = await Event.create({
      name,
      description,
      location,
      date,
      price,
      capacity,
      image: image ?? null,
    });

    res.status(201).json({
      message: "Evento creado correctamente",
      event,
    });
  } catch (error) {
    console.error("Error en createEvent:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /events/:id  (admin)
export const updateEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findByPk(req.params.id as string);

    if (!event) {
      res.status(404).json({ message: "Evento no encontrado" });
      return;
    }

    await event.update(req.body);

    res.json({
      message: "Evento actualizado correctamente",
      event,
    });
  } catch (error) {
    console.error("Error en updateEvent:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /events/:id  (admin)
export const deleteEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const event = await Event.findByPk(req.params.id as string);

    if (!event) {
      res.status(404).json({ message: "Evento no encontrado" });
      return;
    }

    await event.destroy();

    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteEvent:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
