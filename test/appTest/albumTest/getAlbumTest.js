const chai = require('chai'),
  nock = require('nock');

describe('Getting the album list from a provided API ', () => {
  it('if the User is loged in with a correct token a list of albums will be recived in JSON format', done => {
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsb2Z1c2VyIjoiYWRtaW5Ad29sb3guY28iLCJpYXQiOjE1NDE3MDg5NTR9.hPc1jUi1RD2tqSpNesOf6jzmFaz6n1G-2q-Ytg4rySg';

    nock('https://jsonplaceholder.typicode.com/albums', {
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
    nock('https://jsonplaceholder.typicode.com/albums')
      .get('/albums')
      .reply(401, 'unauthorized acces, you must log In before performing this action')
      .then(done());
  });
});
