const path = require('path');
const dotEnvPath = path.resolve('./.env.test');
require('dotenv').config({path: dotEnvPath});

const constants = require('../config/constants');
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('Test city api', () => {
    describe(`Get city info from valid query (${constants.tests.VALID_CITY})`, () => {
        it("should return an array where length >= 1", done => {
            chai
                .request(app)
                .get(`/api/city?query=${constants.tests.VALID_CITY}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length.gte(1);
                    done();
                });
        });
    });

    describe(`Get city info from invalid query (${constants.tests.INVALID_CITY})`, () => {
        it("should return an array where length == 0", done => {
            chai
                .request(app)
                .get(`/api/city?query=${constants.tests.INVALID_CITY}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(0);
                    done();
                });
        });
    });

    describe("Get city info from empty query", () => {
        it("should return a 422 response with an invalid query message", done => {
            chai
                .request(app)
                .get(`/api/city?query=`)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equals(constants.errors.EMPTY_QUERY);
                    done();
                });
        });
    });

    describe("Get city info from undefined query", () => {
        it("should return a 422 response with an invalid query message", done => {
            chai
                .request(app)
                .get(`/api/city`)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equals(constants.errors.QUERY_REQUIRED);
                    done();
                });
        });
    });
});
