const feedbackService = require('../services/feedback.service');
const Controller = require('./controller');

class FeedbackController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }

  getAll (request, response) {
    this.service.getAll().then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }

  getAllVerified (request, response) {
    this.service.getAllVerified().then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }

  create (request, response) {
    this.service.create(request.body).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }

  update (request, response) {
    this.service.update(request.params.id, request.body).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }

  delete (request, response) {
    this.service.delete(request.params.id).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }
}

module.exports = new FeedbackController(feedbackService);