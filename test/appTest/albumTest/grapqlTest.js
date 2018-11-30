const album_ = require('./../../../app/models/albums'),
  app = require('./../../../app'),
  chai = require('chai'),
  expect = chai.expect;

describe('getting the list of all albums, loged In, with graphql ', () => {
  it('if the User is loged in with a correct token a Json list with the requested information will be recibed', done => {
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
      .then(() => {
        const data = {
          email: 'name@wolox.co',
          password: '12345qwe'
        };
        chai
          .request(app)
          .post('/user/sessions')
          .send(data)
          .then(respo => {
            const Cookies = respo.headers['set-cookie'].pop().split(';')[0],
              token = Cookies.substring(11);
            const query = `{
                albums 
                  {
                  id,title}
                }`;
            chai
              .request(app)
              .get('/graphalbums')
              .set('accestoken', token)
              .send(query)
              .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.length).to.have.lengthOf.at.least(1);
                done();
              })
              .catch(error => {
                done();
              });
          });
      });
  });
});

describe('getting the list of all albums, but NOT loged In, with graphql ', () => {
  it('if the User is loged in with a correct token a Json list with the requested information will be recibed', done => {
    const query = `{
        albums 
          {
          id,title}
        }`;
    chai
      .request(app)
      .get('/graphalbums')
      .send(query)
      .then(res => {
        expect(res).to.have.property('errors');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('purchasing an album, loged In, and then deleting it', () => {
  it('if the User is loged in with a correct token and an album was correctly purchased before, the album will be deleted from his list of purchased albums', done => {
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
      .then(() => {
        const data = {
          email: 'name@wolox.co',
          password: '12345qwe'
        };
        chai
          .request(app)
          .post('/user/sessions')
          .send(data)
          .then(respo => {
            const Cookies = respo.headers['set-cookie'].pop().split(';')[0],
              token = Cookies.substring(11);
            chai
              .request(app)
              .get('/albums/1')
              .set('accestoken', token)
              .then(res => {
                expect(res).to.have.status(200);
                const query = `mutation {
                    delete(id:2)
                  }`;
                chai
                  .request(app)
                  .get('/deletealbums/1')
                  .send(query)
                  .set('accestoken', token)
                  .then(final => {
                    expect(final).to.have.status(200);
                    album_
                      .findAll({ attributes: ['id'], where: { albumId: '1', userId: '1' }, raw: true })
                      .then(album => {
                        expect(album).to.equal(null);
                      });
                  });
              })
              .catch(error => {
                done();
              });
          });
      });
  });
});

describe('deleting a not purchased album', () => {
  it('if the User is loged in with a correct token and an album was NOT  purchased before, the album will not be deleted from his list of purchased albums', done => {
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
      .then(() => {
        const data = {
          email: 'name@wolox.co',
          password: '12345qwe'
        };
        chai
          .request(app)
          .post('/user/sessions')
          .send(data)
          .then(respo => {
            const Cookies = respo.headers['set-cookie'].pop().split(';')[0],
              token = Cookies.substring(11);
            const query = `mutation {
                      delete(id:2)
                    }`;
            chai
              .request(app)
              .get('/deletealbums/1')
              .send(query)
              .set('accestoken', token)
              .then(final => {
                expect(final).to.have.status(200);
                expect(final.message).to.equal('the album was not purchased before');
              })

              .catch(error => {
                done();
              });
          });
      });
  });
});
