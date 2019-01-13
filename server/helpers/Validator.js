export default class Validator {
  constructor() {
    this.errors = [];
  }

  isEmptyInput(input, inputName) {
    if (!input) {
      return this.errors.push(`${inputName} cannot be empty`);
    }
    return false;
  }

  inputIsNumber(input, inputName) {
    if (isNaN(input)) {
      return this.errors.push(`${inputName} must be a number`);
    }
    return false;
  }

  validationErrors() {
    return this.errors.length > 0 ? this.errors : false;
  }
}
