const { EmailNotValidError } = require('../exceptions/email.exception.js');

class EmailValidator {
  isValid(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
    if(!regex.test(email)) {
      throw new EmailNotValidError("Format d'email incorrect");
    }
  }
}

module.exports = new EmailValidator();