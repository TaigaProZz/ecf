const express = require('express');
const router = express.Router();
const controller = require('../controllers/employee.controller');
const cookieController = require('../controllers/cookie.controller');

// get employee 
router.get('/', cookieController.getCookie.bind(cookieController), controller.getAll.bind(controller));

// post employee
router.post('/', cookieController.getCookie.bind(cookieController), controller.create.bind(controller));

// put employee
router.put('/:id', cookieController.getCookie.bind(cookieController), controller.update.bind(controller));

// delete employee
router.delete('/:id', cookieController.getCookie.bind(cookieController), controller.delete.bind(controller));

module.exports = router;