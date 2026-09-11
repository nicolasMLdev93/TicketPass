import request from 'supertest';
import app from '../app';
import { setupTestDB, clearTestDB, teardownTestDB } from './dbSetup';
import { registerAndLogin, createEvent } from './helpers';

describe('Reservations Routes', () => {
  let token: string;

  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
    const auth = await registerAndLogin();
    token = auth.token;
  });

  // ==========================
  // POST /api/reservations
  // ==========================
  describe('POST /api/reservations', () => {
    it('debería crear una reserva correctamente', async () => {
      const event = await createEvent({ price: 100, capacity: 20 });

      const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: event.id, quantity: 3 });

      expect(res.status).toBe(201);
      expect(res.body.reservation.quantity).toBe(3);
      expect(res.body.reservation.status).toBe('pending');
      expect(Number(res.body.reservation.total)).toBe(300);
    });

    it('debería fallar si el evento no existe (404)', async () => {
      const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: 99999, quantity: 1 });

      expect(res.status).toBe(404);
    });

    it('debería fallar si el evento ya pasó (400)', async () => {
      const past = new Date();
      past.setDate(past.getDate() - 1);
      const event = await createEvent({ date: past });

      const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: event.id, quantity: 1 });

      expect(res.status).toBe(400);
    });

    it('debería fallar si no hay capacidad suficiente (400)', async () => {
      const event = await createEvent({ capacity: 5, price: 100 });

      const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: event.id, quantity: 10 });

      expect(res.status).toBe(400);
    });
  });

  // ==========================
  // GET /api/reservations
  // ==========================
  describe('GET /api/reservations', () => {
    it('debería listar las reservas del usuario', async () => {
      const event = await createEvent();
      await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: event.id, quantity: 1 });

      const res = await request(app)
        .get('/api/reservations')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
    });
  });

  // ==========================
  // PUT /api/reservations/:id
  // ==========================
  describe('PUT /api/reservations/:id', () => {
    it('debería confirmar la reserva y crear los tickets', async () => {
      const event = await createEvent({ price: 100 });

      const createRes = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: event.id, quantity: 3 });

      const reservationId = createRes.body.reservation.id;

      const res = await request(app)
        .put(`/api/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'confirmed' });

      expect(res.status).toBe(200);
      expect(res.body.reservation.status).toBe('confirmed');

      // 👇 Verificar que se crearon 3 tickets
      const ticketsRes = await request(app)
        .get('/api/tickets')
        .set('Authorization', `Bearer ${token}`);

      expect(ticketsRes.body.count).toBe(3);
    });
  });

  // ==========================
  // DELETE /api/reservations/:id
  // ==========================
  describe('DELETE /api/reservations/:id', () => {
    it('debería cancelar la reserva', async () => {
      const event = await createEvent();
      const createRes = await request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventId: event.id, quantity: 1 });

      const reservationId = createRes.body.reservation.id;

      const res = await request(app)
        .delete(`/api/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);

      const getRes = await request(app)
        .get(`/api/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(getRes.body.reservation.status).toBe('cancelled');
    });
  });
});