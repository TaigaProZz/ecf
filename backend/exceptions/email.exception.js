class EmailNotValidError extends Error {
  constructor(message,  response = "Email Invalide") {
      super(message);
      this.name = 'Email non valide';
      this.response = response;
  }
}

module.exports = {
  EmailNotValidError,
}