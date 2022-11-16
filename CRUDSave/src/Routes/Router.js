const express = require('express');
const router = express.Router();
const controller = require('../Controllers/Controller');

router.post('/create', controller.create);

module.exports = router;