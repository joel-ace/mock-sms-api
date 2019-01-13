import request from 'supertest';
import app from '../../../app';
import { Contact } from '../../models';

describe('contacts', () => {
  const nanId = 'hkjkj';
  const notExistId = 300;
  const maxOutId = 5000000000000000; // to cause a sequelize error

  beforeAll(async () => {
    await Contact.sync({ force: true });
    await Contact.bulkCreate(
      [
        {
          name: 'Ade',
          phoneNumber: '08037897567',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Emmanuel',
          phoneNumber: '0907468903',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  });

  describe('/POST requests', () => {
    it('should return a contacts object if successful', async () => {
      const contact = {
        name: 'Johnson',
        phoneNumber: '07045673890',
      };
      expect.assertions(5);
      const response = await request(app).post('/api/v1/contacts')
        .send(contact);
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty(['contact']);
      expect(response.body.contact.id).toBe(3);
      expect(response.body.contact.name).toEqual('Johnson');
      expect(response.body.contact.phoneNumber).toEqual('07045673890');
    });

    it('should return an error array if the request input fields are empty', async () => {
      const contact = {
        name: '',
        phoneNumber: 'dsfdfdsfds',
      };
      expect.assertions(4);
      const response = await request(app).post('/api/v1/contacts')
        .send(contact);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error).toContain('name cannot be empty');
      expect(response.body.error).toContain('phoneNumber must be a number');
    });

    it('should return an error array and fail if the phone number already exists', async () => {
      const contact = {
        name: 'Jane',
        phoneNumber: '07045673890',
      };
      expect.assertions(3);
      const response = await request(app).post('/api/v1/contacts')
        .send(contact);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error).toContain('phone number already exists');
    });
  });

  describe('/GET requests', () => {
    it('should return an array of contacts if successful', async () => {
      expect.assertions(5);
      const response = await request(app).get('/api/v1/contacts');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['contacts']);
      expect(response.body.contacts.length).toBe(3);
      expect(response.body.contacts[0].name).toEqual('Ade');
      expect(response.body.contacts[0].phoneNumber).toEqual('08037897567');
    });

    it('should return a 400 status if no id is sent in the request', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${nanId}`);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('id must be a number');
    });

    it('should display an internal server error message if there is a sequelize error', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${maxOutId}`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });

    it('should return when a 404 status if contact id requested does not exist', async () => {
      expect.assertions(3);
      const response = await request(app).get(`/api/v1/contacts/${notExistId}`);
      expect(response.statusCode).toEqual(404);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('this contact does not exist or has been previously deleted');
    });

    it('should return a contact object when requested using an id', async () => {
      const contactId = 2;
      expect.assertions(5);
      const response = await request(app).get(`/api/v1/contacts/${contactId}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['contact']);
      expect(response.body.contact.id).toEqual(contactId);
      expect(response.body.contact.name).toEqual('Emmanuel');
      expect(response.body.contact.phoneNumber).toEqual('0907468903');
    });
  });

  describe('/DELETE requests', () => {
    const contactId = 3;
    it('should return a 400 status if no id is sent in the request', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/contacts/${nanId}`);
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error[0]).toBe('id must be a number');
    });

    it('should return when a 404 status if contact id requested does not exist', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/contacts/${notExistId}`);
      expect(response.statusCode).toEqual(404);
      expect(response.body).toHaveProperty(['error']);
      expect(response.body.error).toBe('this contact does not exist or has been previously deleted');
    });

    it('should display an internal server error message if there is a sequelize error', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/contacts/${maxOutId}`);
      expect(response.statusCode).toEqual(500);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('We encountered an error. Please try again later');
    });

    it('should delete a contact when requested with an id', async () => {
      expect.assertions(3);
      const response = await request(app).delete(`/api/v1/contacts/${contactId}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty(['message']);
      expect(response.body.message).toBe('contact has been succefully deleted');
    });
  });
});
