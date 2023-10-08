const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedule.controller');
const cookieController = require('../controllers/cookie.controller');

// get schedule
router.get('/', controller.getAll.bind(controller));

// post schedule
router.post('/', cookieController.getCookie.bind(cookieController), controller.update.bind(controller));

module.exports = router;