const express = require('express');
const router = express.Router();
const carImageController = require('../controllers/car.image.controller');

// get all image's cars
router.get('/', carImageController.getAll.bind(carImageController));

// get specific image's car by id 
router.get("/:id", carImageController.getById.bind(carImageController));

module.exports = router;