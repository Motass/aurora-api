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
        it("should return an array where length >= 1", async () => {
            const info = await userService.getInfoFromIp(constants.tests.VALID_IP);
            expect(info).to.have.property('ip');
            expect(info).to.have.property('city');
            // done();
        });

        // it("looks for an invalid city", done => {
        //     chai
        //         .request(app)
        //         .post("/add")
        //         .send({ num1: 5, num2: 5 })
        //         .end((err, res) => {
        //             expect(res).to.have.status(200);
        //             expect(res.body.status).to.equals("success");
        //             expect(res.body.result).to.equals(10);
        //             done();
        //         });
        // });
    });

    describe(`Check IP STACK api with invalid ip (${constants.tests.INVALID_IP})`, () => {
        it("should return an array where length >= 1", async () => {
            const info = await userService.getInfoFromIp(constants.tests.INVALID_IP);
            expect(info).to.have.property('ip');
            expect(info.ip).to.equals(constants.tests.INVALID_IP);
            expect(info).to.have.property('city');
            expect(info.city).to.equals(null);
        });
    });
});
