// src/app.ts
import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

// Rutas
app.use("/auth", authRoutes);

export default app;
