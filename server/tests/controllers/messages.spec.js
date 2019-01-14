import request from 'supertest';
import { Message } from '../../models';
import app from '../../../app';
import testData from '../testData';

describe('Messages', () => {
  const nanId = 'hkjkj';
  const notExistId = 300;
  const maxOutId = 5000000000000000; // to cause a sequelize error

  afterAll(() => {
    Message.close();
  });

  describe('/POST requests', () => {
    it('should return an sms object if successful', async () => {
      const message = {
        senderId: 1,
        receiverId: 2,
        message: 'this is an sms message'
      };
      expect.assertions(7);
      const response = await request(app).post('/api/v1/messages')
        .send(message);
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty(['sms']);
      expect(response.body.sms.id).toBe(6);
      expect(response.body.sms.status).toBeFalsy();
      expect(response.body.sms.senderId).toEqual(message.senderId);
      expect(response.body.sms.receiverId).toEqual(message.receiverId);
      expect(response.body.sms.message).toEqual(message.message);
    });

    it('should return a 400 status if sender or receiver id is not a number', async () => {
      const message = {
        senderId: nanId,
        receiverId: 2,
        message: 'this is an sms message'
      };
      expect.assertions(3);
      const response = await request(app).post('/api/v1/messages')
        .send(message);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('senderId must be a number');
    });

    it('should return a foreign key constraint error when sender or receiver id doesnt belond to any contact', async () => {
      const message = {
        senderId: notExistId,
        receiverId: 7,
        message: 'this is an sms message'
      };
      expect.assertions(3);
      const response = await request(app).post('/api/v1/messages')
        .send(message);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('foreign key constraint error');
    });

    it('should return an internal server error message if there is a sequelize error', async () => {
      const message = {
        senderId: maxOutId,
        receiverId: 7,
        message: 'this is an sms message'
      };
      expect.assertions(3);
      const response = await request(app).post('/api/v1/messages')
        .send(message);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });
  });

  describe('/GET requests', () => {
    it('should return an sms object if requested using an id', async () => {
      const messageId = 5;
      expect.assertions(6);
      const response = await request(app).get(`/api/v1/messages/${messageId}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['sms']);
      expect(response.body.sms.sender.name).toEqual(testData.contacts[1].name);
      expect(response.body.sms.receiver.name).toEqual(testData.contacts[0].name);
      expect(response.body.sms.status).toBeFalsy();
      expect(response.body.sms.message).toEqual(testData.messages[4].message);
    });

    it('should return a 400 status if requested message id is not a number', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/messages/${nanId}`);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('id must be a number');
    });

    it('should display an internal server error message if there is a sequelize error', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/messages/${maxOutId}`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });

    it('should return when a 404 status if message id requested does not exist', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/messages/${notExistId}`);
      expect(response.statusCode).toEqual(404);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('this sms does not exist or has been previously deleted');
    });
  });

  describe('/GET sent messages', () => {
    it('should return a 400 status if requested contact id is not a number', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${nanId}/sms/sent`);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('id must be a number');
    });

    it('should display an internal server error message if there is a sequelize error', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${maxOutId}/sms/sent`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });

    it('should return when an array of messages sent by a contact', async () => {
      const contactId = 1;
      expect.assertions(6);
      const response = await request(app).get(`/api/v1/contacts/${contactId}/sms/sent`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['sms']);
      expect(response.body.sms.length).toBe(3);
      expect(response.body.sms[0].id).toBe(1);
      expect(response.body.sms[0].message).toBe('this is a message');
      expect(response.body.sms[0].sender.name).toBe('Ade');
    });
  });

  describe('/GET received messages', () => {
    it('should return a 400 status if requested contact id is not a number', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${nanId}/sms/received`);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('id must be a number');
    });

    it('should display an internal server error message if there is a sequelize error', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${maxOutId}/sms/received`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });

    it('should return an array of messages received by a contact', async () => {
      const contactId = 1;
      expect.assertions(6);
      const response = await request(app).get(`/api/v1/contacts/${contactId}/sms/received`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['sms']);
      expect(response.body.sms.length).toBe(1);
      expect(response.body.sms[0].id).toBe(5);
      expect(response.body.sms[0].message).toBe('this is yet another message');
      expect(response.body.sms[0].sender.name).toBe('Emmanuel');
    });
  });

  describe('/DELETE requests', () => {
    it('should return a 400 status if no id is sent in the request', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/messages/${nanId}`);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('id must be a number');
    });

    it('should return when a 404 status if message id requested does not exist', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/messages/${notExistId}`);
      expect(response.statusCode).toEqual(404);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error).toBe('this sms does not exist or has been previously deleted');
    });

    it('should display an internal server error message if there is a sequelize error', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/messages/${maxOutId}`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });

    it('should delete an sms when requested with an id', async () => {
      const messageId = 4;
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/messages/${messageId}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('sms has been succefully deleted');
    });
  });
});
