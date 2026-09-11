import { body, param } from "express-validator";
import { handleValidationErrors } from "./validationMiddleware";

// 👑 Validaciones para CREAR evento
export const validateCreateEvent = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("El nombre debe tener entre 3 y 150 caracteres"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("La ubicación es obligatoria")
    .isLength({ max: 200 })
    .withMessage("La ubicación no puede superar los 200 caracteres"),

  body("date")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener formato ISO 8601 (ej: 2026-03-15T20:00:00)")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("La fecha del evento debe ser en el futuro");
      }
      return true;
    }),

  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),

  body("capacity")
    .notEmpty()
    .withMessage("La capacidad es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un entero mayor a 0"),

  body("image")
    .optional({ nullable: true })
    .isURL()
    .withMessage("La imagen debe ser una URL válida"),

  handleValidationErrors,
];

// ✏️ Validaciones para ACTUALIZAR evento
export const validateUpdateEvent = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero válido"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("El nombre debe tener entre 3 y 150 caracteres"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La ubicación no puede superar los 200 caracteres"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato ISO 8601")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("La fecha del evento debe ser en el futuro");
      }
      return true;
    }),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un entero mayor a 0"),

  body("image")
    .optional({ nullable: true })
    .isURL()
    .withMessage("La imagen debe ser una URL válida"),

  handleValidationErrors,
];

// 🗑️ Validación para ID en rutas GET/:id o DELETE/:id
export const validateEventId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero válido"),
  handleValidationErrors,
];