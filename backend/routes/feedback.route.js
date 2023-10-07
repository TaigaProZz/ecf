const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedback.controller');
const cookieController = require('../controllers/cookie.controller');

// get feedbacks 
router.get('/', controller.getAll.bind(controller));
router.get('/verified', controller.getAllVerified.bind(controller));


// post feedbacks 
router.post('/', controller.create.bind(controller));

// update feedback validation 
router.put('/:id', cookieController.getCookie.bind(cookieController), controller.update.bind(controller));

// delete feedback
router.delete('/:id', cookieController.getCookie.bind(cookieController), controller.delete.bind(controller));

module.exports = router;