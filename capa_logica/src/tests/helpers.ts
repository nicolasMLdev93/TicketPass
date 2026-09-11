import request from 'supertest';
import app from '../app'; 

export function randomEmail(): string {
  return `test_${Date.now()}_${Math.random().toString(36).slice(2)}@example.com`;
}

export async function registerUser(overrides: Partial<{
  name: string;
  email: string;
  password: string;
}> = {}): Promise<{ token: string; user: any }> {
  const payload = {
    name: overrides.name ?? 'Test User',
    email: overrides.email ?? randomEmail(),
    password: overrides.password ?? 'Password123',
  };

  const res = await request(app).post('/api/auth/register').send(payload);

  if (res.status !== 201) {
    throw new Error(
      `Register falló (${res.status}): ${JSON.stringify(res.body)}`,
    );
  }

  return { token: res.body.token, user: res.body.user };
}

export async function registerAndLogin(overrides: Partial<{
  name: string;
  email: string;
  password: string;
}> = {}): Promise<{ token: string; user: any }> {
  const payload = {
    name: overrides.name ?? 'Test User',
    email: overrides.email ?? randomEmail(),
    password: overrides.password ?? 'Password123',
  };

  await request(app).post('/api/auth/register').send(payload);

  const res = await request(app).post('/api/auth/login').send({
    email: payload.email,
    password: payload.password,
  });

  if (res.status !== 200) {
    throw new Error(`Login falló (${res.status}): ${JSON.stringify(res.body)}`);
  }

  return { token: res.body.token, user: res.body.user };
}

// 👇 Crea un admin directamente en la DB (evita tener que registrar y luego promover)
export async function createAdmin(): Promise<{ token: string; user: any }> {
  const { User } = await import('../models');
  const bcrypt = await import('bcryptjs');
  const { generateToken } = await import('../utils/jwt');

  const email = randomEmail();
  const hashedPassword = await bcrypt.hash('Password123', 10);

  const user = await User.create({
    name: 'Admin Test',
    email,
    password: hashedPassword,
    role: 'admin',
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

export async function createEvent(overrides: Partial<{
  name: string;
  description: string;
  location: string;
  date: Date;
  price: number;
  capacity: number;
}> = {}): Promise<any> {
  const { Event } = await import('../models');

  const future = new Date();
  future.setDate(future.getDate() + 30);

  return Event.create({
    name: overrides.name ?? 'Concierto Test',
    description: overrides.description ?? 'Evento de prueba',
    location: overrides.location ?? 'Estadio Test',
    date: overrides.date ?? future,
    price: overrides.price ?? 100,
    capacity: overrides.capacity ?? 50,
  });
}