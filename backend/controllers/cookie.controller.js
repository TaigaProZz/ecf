require('dotenv').config();
const cookieService = require('../services/cookie.service');
const Controller = require('./controller');

class AuthController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }
  
  getCookie(request, response, next) {
    this.service.getCookie(request, response, next).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }
}


module.exports = new AuthController(cookieService);