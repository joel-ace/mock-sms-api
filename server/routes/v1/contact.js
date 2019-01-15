import express from 'express';
import {
  createContact,
  getAllContacts,
  deleteContact,
  getContactById
} from '../../controllers/contacts';
import {
  sentMessagesByContact,
  receivedMessagesByContact,
} from '../../controllers/messages';

const Router = express.Router();

Router.route('/')
  .post(createContact)
  .get(getAllContacts);

Router.route('/:id')
  .get(getContactById)
  .delete(deleteContact);

Router.route('/:id/sms/sent').get(sentMessagesByContact);
Router.route('/:id/sms/received').get(receivedMessagesByContact);

export default Router;
