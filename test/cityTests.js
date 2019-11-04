const path = require('path');
const dotEnvPath = path.resolve('./.env.test');
require('dotenv').config({path: dotEnvPath});

const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");


const { expect } = chai;
chai.use(chaiHttp);
describe("Get city info from valid query", () => {
    it("should return an array where length >= 1", done => {
        chai
            .request(app)
            .get("/city?query=Vancouver")
            .end((err, res) => {
                console.log(res);
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Testing API");
                done();
            });
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