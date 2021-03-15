const express = require('express');
const router = express.Router();

const cartsController = require('../controllers/cartsController');

router.post("/addToCart", cartsController.addToCart);
router.post("/changeQuantity", cartsController.changeQuantity);
router.post("/removeFromCart", cartsController.removeFromCart);

module.exports = router;