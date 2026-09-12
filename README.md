# 🎟️ TicketPass

API REST para gestión de eventos, reservas y tickets. Permite a usuarios registrarse, reservar entradas para eventos y recibir tickets con códigos únicos que pueden ser validados por administradores.

Desarrollada con **Node.js + TypeScript + Express + Sequelize**.

---

## 🚀 Características

- **Autenticación JWT** – registro e inicio de sesión con contraseñas hasheadas (bcrypt).
- **Roles de usuario** – soporte para usuarios `user` y `admin` con permisos diferenciados.
- **Gestión de eventos** – CRUD completo de eventos (solo admin puede crear/editar/eliminar).
- **Sistema de reservas** – los usuarios pueden reservar entradas con control de capacidad y fechas.
- **Generación de tickets** – al confirmar una reserva, se generan tickets únicos con código `TKT-XXXXXXXX`.
- **Validación de tickets** – los admins pueden marcar tickets como usados.
- **Documentación Swagger** – endpoints documentados con OpenAPI 3.0.
- **Testing automatizado** – suite completa con Jest + Supertest sobre SQLite en memoria.

---

## 🛠 Tecnologías

### Backend
- **Node.js + Express 5**
- **TypeScript**
- **Sequelize (ORM)** + MySQL (prod) / SQLite (tests)
- **JWT** para autenticación
- **bcryptjs** para hashing de contraseñas
- **Express-validator** para validaciones
- **Swagger (OpenAPI 3.0)** para documentación

### Testing
- **Jest** como test runner
- **ts-jest** para compilar TypeScript al vuelo
- **Supertest** para hacer requests HTTP contra la app
- **SQLite en memoria** para tests aislados (no toca MySQL)

---

## 📋 Requisitos previos

- **Node.js ≥ 18**
- **MySQL** (local o remoto, ej. Clever Cloud)
- **npm** o **yarn**

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ticketpass.git
```

### 2. Instalar dependencias del backend (capa_logica)

```bash
cd capa_logica
npm install
```

### 3. Configurar variables de entorno en capa_logica

cd /capa_logica
.env.example indica las variables que se deben configurar con base de datos en la nube

### 4. Compilar capa_logica

```bash
cd capa_logica
npm run build
```

▶️ Modo desarrollo

```bash
cd capa_logica
npm run dev
```

📚 Documentación de la API (Swagger)
```bash
http://localhost:3000/api-docs
```

🏗️ Compilar para producción

```bash
cd capa_logica
npm run build
```
```bash
cd capa_logica
npm start
```

🗄️ Migrar base de datos Base de datos

```bash
cd capa_logica
npm run migrate
```

🗄️ Cargar tabla eventos en la base de datos con script

```bash
cd capa_logica
npm run seed
```

🧪 Testing

```bash
cd capa_logica
npm test
```
