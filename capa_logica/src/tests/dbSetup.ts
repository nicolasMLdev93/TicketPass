import sequelize from '../config/database';
import '../models'; 

export async function setupTestDB(): Promise<void> {
  await sequelize.sync({ force: true });
}

export async function clearTestDB(): Promise<void> {
  await sequelize.sync({ force: true });
}

export async function teardownTestDB(): Promise<void> {
  await sequelize.close();
}