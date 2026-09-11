process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'info').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});