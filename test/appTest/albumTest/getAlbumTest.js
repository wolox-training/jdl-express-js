const url = process.env.API_URL,
  validToken = process.env.TOKEN,
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
      .reply(4101)
      .then(done());
  });
});

describe('purchasing an album from a provided API, but not logged In', () => {
  it('if the User is NOT loged in with a correct token and try to get an album, the response wont be solved', done => {
    nock(`'${url}'/10`)
      .get('/albums/:id')
      .reply(4101)
      .then(done());
  });
});
