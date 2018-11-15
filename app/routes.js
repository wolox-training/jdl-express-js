const signIn = require('./controllers/signIn'),
  signUp = require('./controllers/signUp'),
  listOfusers = require('./controllers/userList'),
  albums = require('./controllers/albumController');

exports.init = app => {
  app.post('/user', signUp.signUp);
  app.post('/user/sessions', signIn.sesion);
  app.post('/user/admin', signUp.admUser);
  app.get('/listOfUsers', listOfusers.userList);

  // album

  app.get('/albums', albums.getAlbums);
  app.post('/albums/:id', albums.purchaseAlbum);
  app.post('/user/:userId/albums', albums.purchasedAlbum);
};
