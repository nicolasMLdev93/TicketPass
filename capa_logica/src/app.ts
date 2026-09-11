import express from "express";
import "dotenv/config";
import "./models";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import ticketRoutes from "./routes/ticketRoutes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/reservations", reservationRoutes);
app.use("/tickets", ticketRoutes);

export default app;