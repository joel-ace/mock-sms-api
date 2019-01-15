import express from 'express';
import {
  createMessage,
  getMessageById,
  deleteMessage,
} from '../../controllers/messages';

const Router = express.Router();

Router.route('/')
  .post(createMessage);

Router.route('/:id')
  .get(getMessageById)
  .delete(deleteMessage);


export default Router;
