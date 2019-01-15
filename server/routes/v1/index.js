import express from 'express';
import contact from './contact';
import message from './message';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to mock-sms API',
    });
  });

Router.use('/contacts', contact);
Router.use('/messages', message);

export default Router;
