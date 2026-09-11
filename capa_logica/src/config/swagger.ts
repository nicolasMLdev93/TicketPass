import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TicketPass API",
      version: "1.0.0",
      description: "Documentación de la API de TicketPass",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string", example: "Juan Pérez" },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string", example: "Concierto de Rock" },
            description: { type: "string" },
            location: { type: "string", example: "Estadio Centenario" },
            date: { type: "string", format: "date-time" },
            price: { type: "number", format: "float", example: 1500.5 },
            capacity: { type: "integer", example: 500 },
            image: { type: "string", nullable: true, example: "https://..." },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "integer" },
            eventId: { type: "integer" },
            quantity: { type: "integer", example: 2 },
            total: { type: "number", format: "float", example: 3001.0 },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled"],
              example: "pending",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Ticket: {
          type: "object",
          properties: {
            id: { type: "integer" },
            reservationId: { type: "integer" },
            ticketCode: { type: "string", example: "TICKET-ABC123" },
            status: {
              type: "string",
              enum: ["valid", "used", "cancelled"],
              example: "valid",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
