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
  it('if the User is loged in with a correct token, but the user have not purchased any album yet an empty list of purchased albums will be recived in JSON format', done => {
    chai
      .request(app)
      .get('/user/1/albums')
      .set('accestoken', validToken)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });
});
describe('purchasing an album from a provided API', () => {
  it('if the User is loged in with a correct token the response will be correct, and a mesasge will apear', done => {
    nock(`'${url}'/10`, {
      reqheaders: {
        asccesToken: validToken
      }
    })
      .get('/albums/:id')
      .reply(200)
      .then(done());
  });
});

describe('purchasing an album twice from a provided API', () => {
  it('if the User is loged in with a correct token but the album was already purchased, the response wont be solved', done => {
    nock(`'${url}'/10`, {
      reqheaders: {
        asccesToken: validToken
      }
    })
      .get('/albums/:id')
      .twice()
      .reply(401)
      .then(done());
  });
});

describe('purchasing an album from a provided API, but not logged In', () => {
  it('if the User is NOT loged in with a correct token and try to get an album, the response wont be solved', done => {
    nock(`'${url}'/10`)
      .get('/albums/:id')
      .reply(401)
      .then(done());
  });
});

describe('purchasing an album', () => {
  it('if the User is loged in with a correct token and the album was not purchased before, the album will be added.', done => {
    chai
      .request(app)
      .get('/albums/6')
      .set('accestoken', validToken)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.message).to.equal('the album was purchased!');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('purchasing an album twice', () => {
  it('if the User is loged in with a correct token but the album was purchased before, the album will not be be added.', done => {
    chai.request(app).get('/albums/6');
    chai
      .request(app)
      .get('/albums/6')
      .set('accestoken', validToken)
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.message).to.equal('this album has been purchased before, please pick anotherone');
        done();
      })
      .catch(error => {
        done();
      });
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
describe('purchasing an album, loged In, and then getting the list of purchased albums from this user', () => {
  it('if the User is loged in with a correct token and an album was correctly purchased before, a list will apear with at least 1 album', done => {
    chai
      .request(app)
      .get('/albums/6')
      .set('accestoken', validToken)
      .then(
        chai
          .request(app)
          .get('/user/0/albums')
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

describe('getting the picture list from a purchased the album', () => {
  it('if the User is loged in with a correct token but the album was  not purchased before, an empty list will apear.', done => {
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
        done();
      })
      .catch(error => {
        done();
      });
  });
});
describe('purchasing an album but not logged in', () => {
  it('if the User is NOT loged in with a correct token the request wont be resolved', done => {
    chai
      .request(app)
      .get('/albums/9')
      .then(res => {
        expect(res).to.have.status(401);
        expect(res.message).to.equal('unauthorized acces, you must log In before performing this action');
        done();
      })
      .catch(error => {
        done();
      });
  });
});
