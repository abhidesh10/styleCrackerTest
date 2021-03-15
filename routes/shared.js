const express = require('express');
const router = express.Router();

const sharedController = require('../controllers/sharedController');

// router.post("/migrate", sharedController.migrate);
router.post("/getNextSequenceValue", sharedController.getNextSequenceValue);

module.exports = router;