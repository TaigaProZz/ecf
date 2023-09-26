class Controller {
  constructor(service, validator = null) {
    this.service = service;
    this.validator = validator;
  }
  
  setResponse(data, response, status = 200) {
    response.status(status).json(data)
  }

  setError(data, response, status = 400) {
    this.setResponse(data, response, status);
  }
}

module.exports = Controller;