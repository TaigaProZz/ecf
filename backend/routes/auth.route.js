const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const cookieController = require('../controllers/cookie.controller');

// login
router.post('/', authController.login.bind(authController));

// log out 
router.get("/", authController.logout.bind(authController));

module.exports = router;