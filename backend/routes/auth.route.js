const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// login
router.post('/', authController.login.bind(authController));

// log out 
router.get("/", authController.logout.bind(authController));

module.exports = router;