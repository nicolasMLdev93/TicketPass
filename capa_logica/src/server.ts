import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT);

const server = app.listen(PORT, () => {
  console.log(`✓ TicketPass API running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("✗ Failed to start server:", error);
  process.exit(1);
});