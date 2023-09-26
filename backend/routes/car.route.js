const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const carController = require('../controllers/car.controller');

// get cars 
router.get('/', carController.getAll.bind(carController));
router.get('/:id', carController.getById.bind(carController));
router.post('/', upload.array("carImage"), carController.createCar.bind(carController));
router.delete('/:id', carController.deleteCar.bind(carController));

module.exports = router;