var express = require('express');
var router = express.Router();
const cityController = require('../controllers/cityController');
const validator = require('../config/validator');
const citySchema = require('../validation/citySchema');

router.get('/',
    validator(citySchema.getCity, 'query'),
    cityController.getCityInfo);

module.exports = router;
