import request from 'supertest';
import app from '../app';
import { setupTestDB, clearTestDB, teardownTestDB } from './dbSetup';
import { registerAndLogin, createAdmin, createEvent } from './helpers';

describe('Tickets Routes', () => {
  let userToken: string;
  let adminToken: string;

  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
    const user = await registerAndLogin();
    userToken = user.token;
    const admin = await createAdmin();
    adminToken = admin.token;
  });

  // Helper para crear una reserva confirmada y generar tickets
  async function setupConfirmedReservation(quantity = 2) {
    const event = await createEvent({ price: 100, capacity: 20 });

    const createRes = await request(app)
      .post('/api/reservations')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ eventId: event.id, quantity });

    const reservationId = createRes.body.reservation.id;

    await request(app)
      .put(`/api/reservations/${reservationId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'confirmed' });

    const ticketsRes = await request(app)
      .get('/api/tickets')
      .set('Authorization', `Bearer ${userToken}`);

    return ticketsRes.body.tickets;
  }

  // ==========================
  // GET /api/tickets
  // ==========================
  describe('GET /api/tickets', () => {
    it('debería listar los tickets del usuario', async () => {
      const tickets = await setupConfirmedReservation(2);

      const res = await request(app)
        .get('/api/tickets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(tickets).toHaveLength(2);
    });

    it('debería devolver lista vacía sin tickets', async () => {
      const res = await request(app)
        .get('/api/tickets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(0);
    });
  });

  // ==========================
  // GET /api/tickets/:id
  // ==========================
  describe('GET /api/tickets/:id', () => {
    it('debería devolver el detalle del ticket', async () => {
      const tickets = await setupConfirmedReservation(1);

      const res = await request(app)
        .get(`/api/tickets/${tickets[0].id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.ticket).toHaveProperty('ticketCode');
    });

    it('debería devolver 404 si no existe', async () => {
      const res = await request(app)
        .get('/api/tickets/99999')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(404);
    });
  });

  // ==========================
  // PUT /api/tickets/:id/validate (admin)
  // ==========================
  describe('PUT /api/tickets/:id/validate', () => {
    it('debería validar un ticket (admin)', async () => {
      const tickets = await setupConfirmedReservation(1);

      const res = await request(app)
        .put(`/api/tickets/${tickets[0].id}/validate`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.ticket.status).toBe('used');
    });

    it('debería fallar si el ticket ya fue usado (400)', async () => {
      const tickets = await setupConfirmedReservation(1);

      await request(app)
        .put(`/api/tickets/${tickets[0].id}/validate`)
        .set('Authorization', `Bearer ${adminToken}`);

      const res = await request(app)
        .put(`/api/tickets/${tickets[0].id}/validate`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(400);
    });

    it('debería rechazar a un usuario normal (403)', async () => {
      const tickets = await setupConfirmedReservation(1);

      const res = await request(app)
        .put(`/api/tickets/${tickets[0].id}/validate`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });
});