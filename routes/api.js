const express = require('express');
const router = express.Router();
const cityRoutes = require('./city');
const userRoutes = require('./user');

router.use('/city', cityRoutes);
router.use('/user', userRoutes);

module.exports = router;
