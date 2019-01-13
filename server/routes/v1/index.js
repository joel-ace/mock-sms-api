import express from 'express';
import contact from './contact';

const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to mock-sms API',
    });
  });

Router.use('/contacts', contact);

export default Router;
