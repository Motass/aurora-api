const path = require('path');
const dotEnvPath = path.resolve('./.env.test');
require('dotenv').config({path: dotEnvPath});

const constants = require('../config/constants');
const userService = require('../services/userService');
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('Test user api', () => {
    describe(`Check IP STACK api with valid ip (${constants.tests.VALID_IP})`, () => {
        it("should return ip info, including city", async () => {
            const info = await userService.getInfoFromIp(constants.tests.VALID_IP);
            expect(info).to.have.property('ip');
            expect(info.ip).to.equals(constants.tests.VALID_IP);
            expect(info).to.have.property('city');
            expect(info.city).to.not.equals(null);
        });
    });

    describe(`Check IP STACK api with invalid ip (${constants.tests.INVALID_IP})`, () => {
        it("should return ip info with all properties null", async () => {
            const info = await userService.getInfoFromIp(constants.tests.INVALID_IP);
            expect(info).to.have.property('ip');
            expect(info.ip).to.equals(constants.tests.INVALID_IP);
            expect(info).to.have.property('city');
            expect(info.city).to.equals(null);
        });
    });
});
