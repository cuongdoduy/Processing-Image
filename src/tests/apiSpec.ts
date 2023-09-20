import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);


describe('Test responses from API', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });
  describe('endpoint: /api/images', (): void => {
    it('Return error because no query were pass', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');
      expect(response.status).toBe(400);
    });
    it('Return error because no height query were pass', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=200'
      );
      expect(response.status).toBe(400);
    });
    it('Return error because no width query were pass', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&height=200'
      );
      expect(response.status).toBe(400);
    });
    it('Return error because no filename query were pass', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?width=200&height=200'
      );
      expect(response.status).toBe(400);
    });
    it('Return error because filename query were pass but no image found', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=test&width=200&height=200'
      );
      expect(response.status).toBe(400);
    });
    it('Return error because width query were pass but not a number', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=abc&height=200'
      );
      expect(response.status).toBe(400);
    });
    it('Return error because height query were pass but not a number', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=200&height=abc'
      );
      expect(response.status).toBe(400);
    });
    it('Return error because width query were pass but not a number', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=abc&height=200'
      );
      expect(response.status).toBe(400);
    });
    it('Return image', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=300&height=200'
      );
      expect(response.status).toBe(200);
    });
  });
});

afterAll(async () => {
  const thumbnailPath = path.resolve(
    __dirname,
    '..',
    '..',
    'assets',
    'thumbnails',
    'encenadaport-300x200.jpg'
  );
  try {
    await fs.access(thumbnailPath);
    await fs.unlink(thumbnailPath);
  } catch (error) {
    console.log(error);
  }
});
