const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// get user infos
router.get('/', controller.getAll.bind(controller));

module.exports = router;