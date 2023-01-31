const request = require('supertest');
const app = require('../../src/app');
const { expect } = require("chai");

describe('GET /dogs', () => {
    it('should return all dog breeds', async () => {
        const response = await request(app).get('/dogs');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.instanceof(Array);
    });

    it('should return a specific dog breed by name', async () => {
        const response = await request(app).get('/dogs?name=Labrador');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.instanceof(Array);
        expect(response.body[0].name.toLowerCase()).to.contain("labrador");
    });

    it('should return an error if the dog breed is not found', async () => {
        const response = await request(app).get('/dogs?name=RazaInexistente');
        expect(response.statusCode).to.equal(404);
        expect(response.text).to.contain("This dog breed was not found: RazaInexistente");
    });
});
