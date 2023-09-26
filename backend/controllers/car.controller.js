const carService = require('../services/car.service');
const Controller = require('./controller');

class CarController extends Controller
{
  constructor (service) {
    super();
    this.service = service;
  }

  createCar (request, response) {
    this.service.createCar(request.body, request.files).then(result => {
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

  getById (request, response) {
    this.service.getById(request.params.id).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }

  deleteCar (request, response) {
    this.service.deleteCar(request.params.id).then(result => {
      this.setResponse(result, response);
    }).catch(error => {
      console.log(error);
      this.setError(error, response);
    });
  }
}

module.exports = new CarController(carService);