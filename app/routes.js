const signIn = require('./controllers/signIn'),
  signUp = require('./controllers/signUp'),
  listOfusers = require('./controllers/userList'),
  albums = require('./controllers/albumController'),
  graphqlHTTP = require('express-graphql'),
  Schema = require('./schema/albumSchema'),
  user = require('./controllers/userController');

exports.init = app => {
  app.post('/user', signUp.signUp);
  app.post('/user/sessions', signIn.sesion);
  app.post('/user/sessions/invalidate_all', user.disableAll);
  app.post('/user/admin', signUp.admUser);
  app.get('/listOfUsers', listOfusers.userList);

  // album
  app.use('/graphalbums', graphqlHTTP({ schema: Schema.schema, rootValue: Schema.root, graphiql: true }));
  app.use('/deletealbums', graphqlHTTP({ schema: Schema.schema, rootValue: Schema.root, graphiql: true }));
  app.get('/albums', albums.getAlbums);
  app.post('/albums/:id', albums.purchaseAlbum);
  app.get('/user/:userId/albums', albums.purchasedAlbums);
  app.get('/albums/:id/picture', albums.albumPictures);
};
