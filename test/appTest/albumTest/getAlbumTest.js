const url = process.env.API_URL,
  validToken = process.env.TOKEN,
  chai = require('chai'),
  app = require('./../../../app'),
  expect = chai.expect,
  nock = require('nock');

describe('Getting the album list from a provided API ', () => {
  it('if the User is loged in with a correct token a list of albums will be recived in JSON format', done => {
    nock(`'${url}'`, {
      reqheaders: {
        asccesToken: validToken
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

describe('purchasing an album, loged In, and then getting the list of album  pictures', () => {
  it('if the User is loged in with a correct token and an album was correctly purchased before, a list will apear with at least 1 picture of the album', done => {
    chai
      .request(app)
      .get('/albums/6')
      .set('accestoken', validToken)
      .then(
        chai
          .request(app)
          .get('/albums/6/picture')
          .set('accestoken', validToken)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.length).to.have.lengthOf.at.least(1);
            done();
          })
          .catch(error => {
            done();
          })
      );
  });
});

describe('getting the list of album pictures but without any bought album', () => {
  it('if the User is loged in with a correct token but an album was not correctly purchased before, an empty list will apear', done => {
    chai
      .request(app)
      .get('/albums/10/picture')
      .set('accestoken', validToken)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.length).to.have.lengthOf(0);
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('getting the list of album pictures but without any bought album, and not loged In', () => {
  it('if the User is NOT loged in without a correct token, and no album was not correctly purchased before, an empty list will apear', done => {
    chai
      .request(app)
      .get('/albums/10/picture')
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.message).to.equal('Error, you need to sign In before performing this action');
        done();
      })
      .catch(error => {
        done();
      });
  });
});
