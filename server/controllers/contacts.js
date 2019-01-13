import { Contact } from '../models';
import Validator from '../helpers/Validator';
import { handleCatchError } from '../helpers/utils';

export const createContact = async (req, res) => {
  const { name, phoneNumber } = req.body;

  const validator = new Validator();
  validator.isEmptyInput(name, 'name');
  validator.isEmptyInput(phoneNumber, 'phoneNumber');
  validator.inputIsNumber(phoneNumber, 'phoneNumber');

  const errors = validator.validationErrors();

  if (errors) {
    return res.status(400).send({
      error: errors,
    });
  }

  try {
    const contact = await Contact.create({
      name,
      phoneNumber,
    });

    return res.status(201).send({
      contact,
    });
  } catch (error) {
    return res.status(400).send({
      error: [error.message],
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.status(200).send({
      contacts,
    });
  } catch (error) {
    return handleCatchError(res);
  }
};

export const getContactById = async (req, res) => {
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
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).send({
        message: 'this contact does not exist or has been previously deleted',
      });
    }

    return res.status(200).send({
      contact,
    });
  } catch (error) {
    return handleCatchError(res);
  }
};

export const deleteContact = async (req, res) => {
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
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).send({
        error: 'this contact does not exist or has been previously deleted',
      });
    }

    await contact.destroy();
    return res.status(200).send({
      message: 'contact has been succefully deleted',
    });
  } catch (error) {
    return handleCatchError(res);
  }
};
