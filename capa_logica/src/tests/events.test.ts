import request from 'supertest';
import app from '../app';
import { setupTestDB, clearTestDB, teardownTestDB } from './dbSetup';
import { registerAndLogin, createAdmin, createEvent } from './helpers';

describe('Events Routes', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  // ==========================
  // GET /api/events
  // ==========================
  describe('GET /api/events', () => {
    it('debería listar eventos (público)', async () => {
      await createEvent({ name: 'Evento A' });
      await createEvent({ name: 'Evento B' });

      const res = await request(app).get('/api/events');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.events).toHaveLength(2);
    });

    it('debería devolver lista vacía si no hay eventos', async () => {
      const res = await request(app).get('/api/events');
      expect(res.status).toBe(200);
      expect(res.body.count).toBe(0);
    });
  });

  // ==========================
  // GET /api/events/:id
  // ==========================
  describe('GET /api/events/:id', () => {
    it('debería devolver un evento por id', async () => {
      const event = await createEvent({ name: 'Evento Único' });

      const res = await request(app).get(`/api/events/${event.id}`);

      expect(res.status).toBe(200);
      expect(res.body.event.name).toBe('Evento Único');
    });

    it('debería devolver 404 si no existe', async () => {
      const res = await request(app).get('/api/events/99999');
      expect(res.status).toBe(404);
    });
  });

  // ==========================
  // POST /api/events (admin)
  // ==========================
  describe('POST /api/events', () => {
    it('debería crear un evento como admin', async () => {
      const { token } = await createAdmin();
      const future = new Date();
      future.setDate(future.getDate() + 10);

      const res = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Evento Nuevo',
          description: 'Descripción',
          location: 'Lugar',
          date: future.toISOString(),
          price: 150,
          capacity: 100,
        });

      expect(res.status).toBe(201);
      expect(res.body.event.name).toBe('Evento Nuevo');
    });

    it('debería rechazar a un usuario normal (403)', async () => {
      const { token } = await registerAndLogin();
      const future = new Date();
      future.setDate(future.getDate() + 10);

      const res = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Evento',
          description: 'Desc',
          location: 'Lugar',
          date: future.toISOString(),
          price: 150,
          capacity: 100,
        });

      expect(res.status).toBe(403);
    });

    it('debería rechazar sin token (401)', async () => {
      const res = await request(app).post('/api/events').send({
        name: 'Evento',
        description: 'Desc',
        location: 'Lugar',
        date: new Date().toISOString(),
        price: 150,
        capacity: 100,
      });

      expect(res.status).toBe(401);
    });
  });
});