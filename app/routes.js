const signIn = require('./controllers/signIn'),
  signUp = require('./controllers/signUp'),
  _listOfusers = require('./controllers/userList');

exports.init = app => {
  app.post('/user', signUp.signUp);
  app.post('/user/sessions', signIn.sesion);
  app.post('/user/admin', signUp.admUser);
  app.get('/users', _listOfusers.userList);
};
