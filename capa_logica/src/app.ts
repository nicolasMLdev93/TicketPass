import express from "express";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import "./models";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

// Rutas //
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/reservations", reservationRoutes);
app.use("/tickets", ticketRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
