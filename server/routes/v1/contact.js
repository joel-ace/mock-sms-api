import express from 'express';
import {
  createContact,
  getAllContacts,
  deleteContact,
  getContactById
} from '../../controllers/contacts';

const Router = express.Router();

Router.route('/')
  .post(createContact)
  .get(getAllContacts);

Router.route('/:id')
  .get(getContactById)
  .delete(deleteContact);

export default Router;
