const carImageService = require('../services/car.image.service');
const Controller = require('./controller');

class CarImageController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }

  getById (request, response) {
    this.service.getById(request.params.id).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }

  getAll (request, response) {
    this.service.getAll().then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }
}

module.exports = new CarImageController(carImageService);