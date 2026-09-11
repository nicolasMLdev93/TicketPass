import request from 'supertest';
import app from '../app';
import { setupTestDB, clearTestDB, teardownTestDB } from './dbSetup';
import { randomEmail, registerUser, registerAndLogin } from './helpers';

describe('Auth Routes', () => {
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
  // POST /api/auth/register
  // ==========================
  describe('POST /api/auth/register', () => {
    it('debería registrar un usuario nuevo', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Nuevo User',
        email: randomEmail(),
        password: 'Password123',
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.role).toBe('user');
    });

    it('debería fallar si el email ya existe (409)', async () => {
      const email = randomEmail();

      await request(app).post('/api/auth/register').send({
        name: 'User 1',
        email,
        password: 'Password123',
      });

      const res = await request(app).post('/api/auth/register').send({
        name: 'User 2',
        email,
        password: 'Password123',
      });

      expect(res.status).toBe(409);
    });
  });

  // ==========================
  // POST /api/auth/login
  // ==========================
  describe('POST /api/auth/login', () => {
    it('debería loguear con credenciales válidas', async () => {
      const { user } = await registerUser();
      const email = user.email;

      const res = await request(app).post('/api/auth/login').send({
        email,
        password: 'Password123',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('debería fallar con password incorrecto (401)', async () => {
      const { user } = await registerUser();

      const res = await request(app).post('/api/auth/login').send({
        email: user.email,
        password: 'Incorrecta123',
      });

      expect(res.status).toBe(401);
    });

    it('debería fallar si el usuario no existe (401)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'noexiste@example.com',
        password: 'Password123',
      });

      expect(res.status).toBe(401);
    });
  });

  // ==========================
  // GET /api/auth/me
  // ==========================
  describe('GET /api/auth/me', () => {
    it('debería devolver el usuario autenticado', async () => {
      const { token, user } = await registerAndLogin();

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(user.email);
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('debería fallar sin token (401)', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
    });
  });
});