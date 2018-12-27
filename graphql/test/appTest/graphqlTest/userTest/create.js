const url = process.env.API_URL,
  chai = require('chai'),
  expect = chai.expect,
  nock = require('nock');

describe('Getting the album list from a provided API ', () => {
  it('if the User is loged in with a correct token a list of albums will be recived in JSON format', done => {
    nock(`'${url}'`).post('/user'),
      { firstName: 'pepito', lastName: 'perez', email: 'pepito@wolox.co', password: '123tiene' }
        .reply(200)
        .then(done());
  });
});
