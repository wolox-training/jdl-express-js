const chai = require('chai'),
  app = require('./../../../app'),
  expect = chai.expect;

describe('sign up with all correct data', () => {
  it('When all the data is correct we will get a message with the new user`s name', done => {
    const user = {
      name: 'name',
      lastName: 'lname',
      email: 'name@wolox.co',
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
        done();
      });
  });
});

describe('sign up without an email', () => {
  it('When someone tries to sign up without an email, a warning message will apear and the request wont be resolved', done => {
    const user = {
      name: 'name',
      lastName: 'lname',
      email: '',
      password: '12345qwe',
      role: 'Admin'
    };
    chai
      .request(app)
      .post('/user')
      .send(user)
      .catch(error => {
        expect(error.toString()).to.equal('Error: Bad Request');
      })
      .then(done());
  });
});

describe('sign up with an unsafe password', () => {
  it('When someone tries to sign up with a password with less than 8 characters, a warning message will apear and the request wont be resolved', done => {
    const user = {
      name: 'name',
      lastName: 'lname',
      email: 'email@wolox.co',
      password: '123qwe',
      role: 'Admin'
    };
    chai
      .request(app)
      .post('/user')
      .send(user)
      .catch(error => {
        expect(error.toString()).to.equal('Error: Bad Request');
      })
      .then(done());
  });
});

describe('sign up without a name', () => {
  it('When someone tries to sign up without a name , the request wont be resolved', done => {
    const user = {
      lastName: 'lname',
      email: 'mail@wolox.ar',
      password: '12345qwe',
      role: 'Admin'
    };
    chai
      .request(app)
      .post('/user')
      .send(user)
      .catch(error => {
        error.should.have.status(400);
        expect(error.message).to.equal('there are missing fields, please verify');
      })
      .then(done());
  });
});

describe('sign up without a lastname', () => {
  it('When someone tries to sign up without a last name , the request wont be resolved', done => {
    const user = {
      name: 'lname',
      email: 'mail@wolox.ar',
      password: '12345qwe',
      role: 'Admin'
    };
    chai
      .request(app)
      .post('/user')
      .send(user)
      .catch(error => {
        error.should.have.status(400);
        expect(error.message).to.equal('there are missing fields, please verify');
      })
      .then(done());
  });
});
