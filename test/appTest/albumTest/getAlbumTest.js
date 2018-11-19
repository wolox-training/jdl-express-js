const url = process.env.API_URL,
  validToken = process.env.TOKEN,
  app = require('./../../../app.js'),
  chai = require('chai'),
  expect = chai.expect,
  nock = require('nock');

describe('Getting the album list from a provided API ', () => {
  it('if the User is loged in with a correct token a list of albums will be recived in JSON format', done => {
    nock(`'${url}'`, {
      reqheaders: {
        accesToken: validToken
      }
    })
      .get('/albums')
      .reply(200)
      .then(done());
  });
});

describe('Getting the album list from a provided API, but not loged In ', () => {
  it('if the User is not loged in with a correct token the request wont succed and a message will apear', done => {
    nock(`'${url}'`)
      .get('/albums')
      .reply(401, 'unauthorized acces, you must log In before performing this action')
      .then(done());
  });
});

describe('Getting the album list of a user ', () => {
  it('if the User is loged in with a correct token a list of purchased albums will be recived in JSON format', done => {
    chai
      .request(app)
      .get('/user/0/albums')
      .set('accestoken', validToken)
      .then(res => {
        expect(res).to.have.status(200);
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Getting the album list of a user without a correct token', () => {
  it('if the User NOT is loged in with a correct token the request wont be resolved', done => {
    chai
      .request(app)
      .get('/user/0/albums')
      .then(res => {
        expect(res).to.have.status(401);
        done();
      })
      .catch(error => {
        done();
      });
  });
});
