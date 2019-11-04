var express = require('express');
var router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.getCityInfo);

module.exports = router;
