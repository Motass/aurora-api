var express = require('express');
var router = express.Router();
const cityRoutes = require("./city");
const userRoutes = require("./user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// api routes
router.use('/city', cityRoutes);
router.use('/user', userRoutes);

module.exports = router;

// 'use strict';
//
// const express = require('express');
// const router = express.Router();
//
// const apiRoute = require('./api/indexApi');
//
// export function index(app) {
//   // api routes
//   router.use('/api', apiRoute(app));
//   router.use('/api/1', apiRoute(app));
//
//   return router;
// }
