const conversationService = require('../services/conversation.service');
const Controller = require('./controller');

class ConversationController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }

  getAllById (request, response) {
    this.service.getAllById(request.params.id).then(result => {
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
}

module.exports = new ConversationController(conversationService);