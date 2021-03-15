const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get("/getProducts/pageNo/:pgNo/pageLimit/:pgL", productsController.getProducts);
router.get("/getProducts", productsController.getProducts);
router.post("/createProducts", productsController.createProducts);

module.exports = router;