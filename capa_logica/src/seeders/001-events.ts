import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert("events", [
    {
      name: "Montevideo Music Festival",
      description:
        "Festival de música en vivo con artistas nacionales e internacionales.",
      location: "Antel Arena, Montevideo",
      date: new Date("2028-01-21T20:00:00"),
      price: 1500,
      capacity: 10000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Rock del Río",
      description:
        "Una noche dedicada al rock con bandas emergentes y reconocidas.",
      location: "Teatro de Verano, Montevideo",
      date: new Date("2028-02-18T21:00:00"),
      price: 1200,
      capacity: 5000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Electronic Waves",
      description:
        "Experiencia de música electrónica con DJs y producción audiovisual.",
      location: "Punta Carretas, Montevideo",
      date: new Date("2028-03-11T22:00:00"),
      price: 1800,
      capacity: 7000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Festival Internacional de Jazz",
      description:
        "Encuentro internacional de jazz con músicos de diferentes países.",
      location: "Auditorio Nacional del Sodre, Montevideo",
      date: new Date("2028-04-15T19:30:00"),
      price: 1000,
      capacity: 2000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Uruguay Gaming Expo",
      description:
        "Evento dedicado a videojuegos, tecnología, esports y entretenimiento digital.",
      location: "Centro de Convenciones, Montevideo",
      date: new Date("2028-05-20T10:00:00"),
      price: 800,
      capacity: 8000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Montevideo Food & Wine",
      description:
        "Festival gastronómico con restaurantes, chefs y bodegas uruguayas.",
      location: "LATU, Montevideo",
      date: new Date("2028-06-17T12:00:00"),
      price: 900,
      capacity: 4000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Summer Beats",
      description:
        "Festival de música y entretenimiento para disfrutar durante el verano.",
      location: "Rambla de Montevideo",
      date: new Date("2029-01-13T18:00:00"),
      price: 1300,
      capacity: 12000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Latin Music Night",
      description: "Noche de música latina con artistas y bandas en vivo.",
      location: "Auditorio ANTEL Arena, Montevideo",
      date: new Date("2029-02-24T20:30:00"),
      price: 1600,
      capacity: 10000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Tech Future Uruguay",
      description:
        "Conferencia sobre tecnología, inteligencia artificial, software e innovación.",
      location: "Punta del Este Convention Center",
      date: new Date("2029-03-16T09:00:00"),
      price: 2000,
      capacity: 3000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Punta del Este Music Experience",
      description:
        "Gran evento musical frente al mar con artistas nacionales e internacionales.",
      location: "Punta del Este, Maldonado",
      date: new Date("2029-04-21T19:00:00"),
      price: 2200,
      capacity: 9000,
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete("events", {});
}
