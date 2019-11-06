const userService = require('../services/userService');
const commonHelper = require('../helpers/commonHelper');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const user = req.user;
    const token = jwt.sign({email: user.email}, process.env.SECRET_KEY);
    res.json({
        user: commonHelper.sanitizeUserData(user),
        token
    });
};

exports.register = async (req, res, next) => {
    try {
        const userData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            ip: req.ip
        };
        const user = await userService.createUser(userData);
        res.json(commonHelper.sanitizeUserData(user));
    } catch (e) {
        next(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const currentUser = req.user;
        const updatedUser = await userService.updateUser(currentUser.email, req.body.firstName, req.body.lastName, req.ip);
        res.json(commonHelper.sanitizeUserData(updatedUser));
    } catch (e) {
        next(e);
    }
};

exports.getUserInfo = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.user.email);
        // const ip = "50.92.194.120";
        // const ip = req.ip || req.connection.remoteAddress;
        // const info = await cityService.getCityFromIP(ip);
        res.json(commonHelper.sanitizeUserData(user));
    } catch (e) {
        next(e);
    }
};
