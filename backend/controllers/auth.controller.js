require('dotenv').config();
const authService = require('../services/auth.service');
const Controller = require('./controller');

class AuthController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }
  
  async login(request, response) {
    try {
      const result = await this.service.login(request.body);
      if (result.success) {
        response.cookie('session', result.token, {
          domain: process.env.REACT_APP_DOMAIN_COOKIE,
          maxAge: 2592000000,
          httpOnly: true,
          secure: true,
          signed: true,
          sameSite: 'none',
        });

        this.setResponse({ name: result.name, permission: result.permission }, response);
      } else {
        response.status(401).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.log(error);
      this.setError(error, response);
    }
  }

  logout(request, response) {
    response.clearCookie('session', {domain: process.env.REACT_APP_DOMAIN_COOKIE, path: '/', httpOnly: true, secure: true, sameSite: 'none'})
    this.setResponse({}, response);
  } 
}

module.exports = new AuthController(authService);