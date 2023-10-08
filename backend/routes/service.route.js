const express = require('express');
const router = express.Router();
const controller = require('../controllers/service.controller');
const cookieController = require('../controllers/cookie.controller');

// get service 
router.get('/', controller.getAll.bind(controller));

// update service 
router.put('/:id', cookieController.getCookie.bind(cookieController), controller.update.bind(controller));

// delete service 
router.delete('/:id', cookieController.getCookie.bind(cookieController), controller.delete.bind(controller));

// post SERVICES 
router.post('/', cookieController.getCookie.bind(cookieController), controller.create.bind(controller));

module.exports = router;