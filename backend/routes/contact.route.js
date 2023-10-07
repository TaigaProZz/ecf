const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const cookieController = require('../controllers/cookie.controller');

// get contact
router.get('/', cookieController.getCookie.bind(cookieController), contactController.getAll.bind(contactController));
router.post('/', contactController.create.bind(contactController));

module.exports = router;