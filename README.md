🎟️ TicketPass
<p align="center"> <strong>API REST para gestión de eventos, reservas y tickets con códigos únicos validables.</strong> </p> <p align="center"> <img src="https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=node.js&logoColor=white" alt="Node.js"> <img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white" alt="Express"> <img src="https://img.shields.io/badge/Sequelize-ORM-52B0E7?logo=sequelize&logoColor=white" alt="Sequelize"> <img src="https://img.shields.io/badge/Tests-Jest%20%2B%20Supertest-C21325?logo=jest&logoColor=white" alt="Jest"> <img src="https://img.shields.io/badge/Docs-Swagger%20OpenAPI%203.0-85EA2D?logo=swagger&logoColor=black" alt="Swagger"> </p>

TicketPass permite a los usuarios registrarse, reservar entradas para eventos y recibir tickets con códigos únicos (TKT-XXXXXXXX) que los administradores pueden validar al ingreso.

📑 Tabla de contenidos
Características
Tecnologías
Arquitectura del proyecto
Requisitos previos
Instalación y configuración
Backend (capa_logica)
Frontend (capa_grafica)
Scripts disponibles
Documentación de la API
Testing
Roles y permisos
Licencia
🚀 Características
Función	Descripción
🔐 Autenticación JWT	Registro e inicio de sesión con contraseñas hasheadas (bcrypt).
👥 Roles de usuario	Soporte para user y admin con permisos diferenciados.
🗓️ Gestión de eventos	CRUD completo de eventos (solo admin puede crear/editar/eliminar).
🎫 Sistema de reservas	Reservas de entradas con control de capacidad y fechas.
🏷️ Generación de tickets	Al confirmar una reserva se generan tickets únicos con código TKT-XXXXXXXX.
✅ Validación de tickets	Los admins pueden marcar tickets como usados.
📘 Documentación Swagger	Endpoints documentados con OpenAPI 3.0.
🧪 Testing automatizado	Suite completa con Jest + Supertest sobre SQLite en memoria.
🛠 Tecnologías
Backend
Node.js + Express 5
TypeScript
Sequelize (ORM) – MySQL en producción / SQLite en tests
JWT para autenticación
bcryptjs para hashing de contraseñas
express-validator para validaciones
Swagger (OpenAPI 3.0) para documentación
Testing
Jest como test runner
ts-jest para compilar TypeScript al vuelo
Supertest para requests HTTP contra la app
SQLite en memoria para tests aislados (no toca MySQL)
🏗 Arquitectura del proyecto
ticketpass/
├── capa_logica/     # Backend: API REST (Node + Express + TypeScript + Sequelize)
└── capa_grafica/    # Frontend: cliente web (Vite)
📋 Requisitos previos
Node.js ≥ 18
MySQL (local o remoto, ej. Clever Cloud)
npm o yarn
⚙️ Instalación y configuración
1. Clonar el repositorio
bash
git clone https://github.com/tu-usuario/ticketpass.git
cd ticketpass
Backend (capa_logica)

2. Instalar dependencias

bash
cd capa_logica
npm install

3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá tus credenciales de base de datos:

bash
cp .env.example .env

.env.example indica las variables necesarias para conectar con tu base de datos MySQL en la nube.

4. Migrar la base de datos

bash
npm run migrate

5. Cargar datos iniciales (seed de eventos)

bash
npm run seed

6. Compilar el proyecto

bash
npm run build

7. Ejecutar en modo desarrollo

bash
npm run dev

8. Compilar y ejecutar en producción

bash
npm run build
npm start
Frontend (capa_grafica)

1. Instalar dependencias

bash
cd capa_grafica
npm install

2. Ejecutar en modo desarrollo

bash
npm run dev

3. Acceder a la aplicación

http://localhost:5173
📜 Scripts disponibles (capa_logica)
Comando	Descripción
npm run dev	Levanta el servidor en modo desarrollo con hot-reload.
npm run build	Compila el proyecto TypeScript a JavaScript.
npm start	Ejecuta la versión compilada (producción).
npm run migrate	Aplica las migraciones de la base de datos.
npm run seed	Carga datos iniciales (eventos) en la base de datos.
npm test	Ejecuta la suite de tests con Jest + Supertest.
📚 Documentación de la API

Una vez levantado el backend, la documentación interactiva (Swagger) está disponible en:

http://localhost:3000/api-docs
🧪 Testing

Los tests corren sobre una base de datos SQLite en memoria, por lo que no afectan la base de datos MySQL configurada.

bash
cd capa_logica
npm test
👥 Roles y permisos
Acción	user	admin
Registrarse / iniciar sesión	✅	✅
Ver eventos	✅	✅
Crear / editar / eliminar eventos	❌	✅
Reservar entradas	✅	✅
Recibir tickets con código único	✅	✅
Validar (marcar como usado) un ticket	❌	✅

