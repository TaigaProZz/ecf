class EmailNotValidError extends Error {
  constructor(message,  response = "msg") {
      super(message);
      this.name = 'msg';
      this.response = response;
  }
}

module.exports = {
  EmailNotValidError,
}