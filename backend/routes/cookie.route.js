const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookie.controller');

// get cookie
router.get('/', cookieController.getCookie.bind(cookieController));

module.exports = router;