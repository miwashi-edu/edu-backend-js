/**
 * @group integration
 */
process.env.NODE_ENV = 'test'

const { expect } = require('chai');
const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.NODE_ENV = 'test'
const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:3000"

describe('/GET user', () => {
    it('it should GET all the users', (done) => {
        chai.request(BACKEND_HOST)
          .get('/user')
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.not.be.null
            expect(res.body).to.be.an('array')
            done()
          })
    })
})