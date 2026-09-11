import { body, param } from "express-validator";
import { handleValidationErrors } from "./validationMiddleware";

// 📝 Crear reserva
export const validateCreateReservation = [
  body("eventId")
    .notEmpty()
    .withMessage("El eventId es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El eventId debe ser un entero mayor a 0"),

  body("quantity")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .isInt({ min: 1, max: 10 })
    .withMessage("La cantidad debe ser un entero entre 1 y 10"),

  handleValidationErrors,
];

// 🔄 Actualizar reserva (por ahora solo el status)
export const validateUpdateReservation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero válido"),

  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("El status debe ser: pending, confirmed o cancelled"),

  handleValidationErrors,
];

// 🆔 Validar ID
export const validateReservationId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero válido"),
  handleValidationErrors,
];
