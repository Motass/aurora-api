const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/update',
    passport.authenticate('jwt', {session: false}),
    userController.update);

router.post('/register', userController.register);

router.post('/login',
    passport.authenticate('local', {session: false}),
    userController.login);

router.get('/info',
    passport.authenticate('jwt', {session: false}),
    userController.getUserInfo)

module.exports = router;
