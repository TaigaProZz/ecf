const userService = require('../services/user.service');
const Controller = require('./controller');

class UserController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }

  getAll(request, response) {
    this.service.getAll(request.signedCookies.session).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }
}

module.exports = new UserController(userService);