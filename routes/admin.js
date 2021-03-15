const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.post("/editProduct", adminController.editProduct);

module.exports = router;