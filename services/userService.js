const User = require('../models/users');
const commonHelper = require('../helpers/commonHelper');
const bcrypt = require('bcrypt');
const ipStack = require('../config/ipStack');
const axios = require('axios');
const constants = require('../config/constants');

const login = async (email, password) => {
    const user = await getUser(email);
    const isAuthenticated = await bcrypt.compare(password, user.password_hash);
    if (!isAuthenticated) {
        throw new Error(constants.errors.WRONG_PASSWORD);
    }
    return user;
};
module.exports.login = login;

const createUser = async (userData) => {
    try {
        let user = new User();

        [userData.password_hash, userData.ipInfo] = await Promise.all([
            bcrypt.hash(userData.password, 10),
            getInfoFromIp(userData.ip)
        ]);

        Object.assign(user, userData);

        await user.save();
        return user;
    } catch (e) {
        throw e;
    }
};
module.exports.createUser = createUser;

const getUser = async (email) => {
        try {
            const user = await User.findOne({'email': email});
            return user;
        } catch (e) {
            throw e;
        }
};
module.exports.getUser = getUser;

const updateUser = async (email, firstName, lastName, ip) => {
    try {
        let user = await getUser(email);
        user.firstName = firstName;
        user.lastName = lastName;
        if (user.ipInfo && user.ipInfo.ip !== ip) {
            user.ipInfo = await getInfoFromIp(ip);
        }
        await user.updateOne(user);
        return user;
    } catch (e) {
        throw e;
    }
};
module.exports.updateUser = updateUser;

const getInfoFromIp = async (ip) => {
    try {
        const url = ipStack.getIpStackURL(ip);
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'application/json'
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};
module.exports.getInfoFromIp = getInfoFromIp;