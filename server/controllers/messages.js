import { Message } from '../models';
import { Contact } from '../models';
import Validator from '../helpers/Validator';
import { handleCatchError } from '../helpers/utils';

export const createMessage = async (req, res) => {
  const { receiverId, senderId, message } = req.body;

  const validator = new Validator();
  validator.isEmptyInput(receiverId, 'receiverId');
  validator.inputIsNumber(receiverId, 'receiverId');
  validator.isEmptyInput(senderId, 'senderId');
  validator.inputIsNumber(senderId, 'senderId');
  validator.isEmptyInput(message, 'message');

  const errors = validator.validationErrors();

  if (errors) {
    return res.status(400).send({
      error: errors,
    });
  }

  try {
    const sms = await Message.create({
      senderId,
      receiverId,
      message,
    });

    return res.status(201).send({
      sms,
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send({
        error: ['foreign key constraint error'],
      });
    }

    return handleCatchError(res);
  }
};

export const getMessageById = async (req, res) => {
  const { id } = req.params;

  const validator = new Validator();
  validator.inputIsNumber(id, 'id');

  const errors = validator.validationErrors();

  if (errors) {
    return res.status(400).send({
      error: errors,
    });
  }

  try {
    const sms = await Message.findByPk(id, {
      attributes: { exclude: ['senderId', 'receiverId', 'updatedAt'] },
      include: [{
        model: Contact,
        as: 'sender',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: Contact,
        as: 'receiver',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }]
    });

    if (!sms) {
      return res.status(404).send({
        message: 'this sms does not exist or has been previously deleted',
      });
    }


    return res.status(200).send({
      sms,
    });
  } catch (error) {
    return handleCatchError(res);
  }
};

export const sentMessagesByContact = async (req, res) => {
  const { id } = req.params;

  const validator = new Validator();
  validator.inputIsNumber(id, 'id');

  const errors = validator.validationErrors();

  if (errors) {
    return res.status(400).send({
      error: errors,
    });
  }

  try {
    const sms = await Message.findAll({
      attributes: { exclude: ['senderId', 'receiverId', 'updatedAt'] },
      where: {
        senderId: id,
      },
      include: [{
        model: Contact,
        as: 'sender',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: Contact,
        as: 'receiver',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }]
    });

    return res.status(200).send({
      sms,
    });
  } catch (error) {
    return handleCatchError(res);
  }
};

export const receivedMessagesByContact = async (req, res) => {
  const { id } = req.params;

  const validator = new Validator();
  validator.inputIsNumber(id, 'id');

  const errors = validator.validationErrors();

  if (errors) {
    return res.status(400).send({
      error: errors,
    });
  }

  try {
    const sms = await Message.findAll({
      attributes: { exclude: ['senderId', 'receiverId', 'updatedAt'] },
      where: {
        receiverId: id,
        status: 'true',
      },
      include: [{
        model: Contact,
        as: 'sender',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: Contact,
        as: 'receiver',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }]
    });

    return res.status(200).send({
      sms,
    });
  } catch (error) {
    return handleCatchError(res);
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  const validator = new Validator();
  validator.inputIsNumber(id, 'id');

  const errors = validator.validationErrors();

  if (errors) {
    return res.status(400).send({
      error: errors,
    });
  }


  try {
    const sms = await Message.findByPk(id);

    if (!sms) {
      return res.status(404).send({
        error: 'this sms does not exist or has been previously deleted',
      });
    }

    await sms.destroy();
    return res.status(200).send({
      message: 'sms has been succefully deleted',
    });
  } catch (error) {
    return handleCatchError(res);
  }
};
