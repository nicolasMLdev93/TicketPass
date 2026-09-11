import { body, param } from "express-validator";
import { handleValidationErrors } from "./validationMiddleware";

// 🆔 Validar ID
export const validateTicketId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero válido"),
  handleValidationErrors,
];

// 🔄 Cambiar status del ticket (admin)
export const validateUpdateTicketStatus = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero válido"),

  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .isIn(["valid", "used", "cancelled"])
    .withMessage("El status debe ser: valid, used o cancelled"),

  handleValidationErrors,
];