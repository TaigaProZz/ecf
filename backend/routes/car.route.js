const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const carController = require('../controllers/car.controller');
const cookieController = require('../controllers/cookie.controller');

// get cars 
router.get('/', carController.getAll.bind(carController));
router.get('/:id', carController.getById.bind(carController));
router.post('/', cookieController.getCookie.bind(cookieController), upload.array("carImage"), carController.createCar.bind(carController));
router.put('/:id', cookieController.getCookie.bind(cookieController), upload.array("carImage"), carController.updateCar.bind(carController));
router.delete('/:id', cookieController.getCookie.bind(cookieController), carController.deleteCar.bind(carController));

module.exports = router;