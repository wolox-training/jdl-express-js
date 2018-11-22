const chai = require('chai'),
  app = require('./../../../app'),
  time = process.env.TIME_OF_SESSION,
  expect = chai.expect;

describe('log In, after sign Up with all correct data', () => {
  it('When all the data is correct we will get a message with the new user`s name', done => {
    const user = {
      name: 'testperson',
      lastName: 'lname',
      email: 'person@wolox.co',
      password: '12345qwe',
      role: 'Admin'
    };

    chai
      .request(app)
      .post('/user')
      .send(user)
      .then(res => {
        expect(res.text).to.equal(`A new user named: ${user.name}, has been created`);
        expect(res).to.have.status(201);
        const data = {
          email: 'person@wolox.co',
          password: '12345qwe'
        };
        const sessiontime = parseInt(time) / 60;
        chai
          .request(app)
          .post('/user/sessions')
          .send(data)
          .then(respo => {
            expect(respo.text).to.equal(
              `welcome! you can be inactive during ${sessiontime} minutes, before your session times out`
            );
          });
        done();
      });
  });
});

describe('log In, after sign Up with all correct data, being inactive until token gets invalid', () => {
  it('When all the data is correct we will get a message with the new user`s name', done => {
    const user = {
      name: 'testperson',
      lastName: 'lname',
      email: 'person@wolox.co',
      password: '12345qwe',
      role: 'Admin'
    };

    chai
      .request(app)
      .post('/user')
      .send(user)
      .then(res => {
        const data = {
          email: 'person@wolox.co',
          password: '12345qwe'
        };
        const sessiontime = parseInt(time) / 60;
        chai
          .request(app)
          .post('/user/sessions')
          .send(data)
          .then(respo => {
            const Cookies = respo.headers['set-cookie'].pop().split(';')[0],
              token = Cookies.substring(11);
            chai
              .request(app)
              .get('/albums')
              .set('accestoken', token)
              .then(resp => {
                // expect(resp).to.not.have.status(200);
                done();
              });
          });
      });
  });
});
