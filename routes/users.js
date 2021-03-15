const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get("/viewCart", usersController.viewCart);

module.exports = router;