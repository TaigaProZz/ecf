class EmailValidator {

    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
      return regex.test(email);
    }
}

module.exports = new EmailValidator();