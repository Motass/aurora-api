const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const validator = require('../config/validator');
const userSchema = require('../validation/userSchemas');

router.put('/update',
    validator(userSchema.update),
    passport.authenticate('jwt', {session: false}),
    userController.update);

router.post('/register',
    validator(userSchema.register),
    userController.register);

router.post('/login',
    validator(userSchema.login),
    passport.authenticate('local', {session: false}),
    userController.login);

router.get('/info',
    passport.authenticate('jwt', {session: false}),
    userController.getUserInfo);

module.exports = router;
