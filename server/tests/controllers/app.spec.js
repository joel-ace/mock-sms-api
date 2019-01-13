import request from 'supertest';
import app from '../../../app';

describe('App', () => {
  afterAll(() => {
    app.close();
    console.log('server closed!');
  });

  describe('undeclared Routes', () => {
    it('should return an error message and status code of 404', async () => {
      const response = await request(app).get('/api/v1/noendpoint');
      expect(response.statusCode).toEqual(404);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toEqual(
        'this resource does not exist or has been previously deleted'
      );
    });
  });

  describe('index route', () => {
    it('should return a 200 status and welcome message', async () => {
      const response = await request(app).get('/api/v1/');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toEqual(
        'Welcome to mock-sms API'
      );
    });
  });
});
