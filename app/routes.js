const signIn = require('./controllers/signIn'),
  signUp = require('./controllers/signUp');

exports.init = app => {
  app.post('/user', signUp.signUp);
  app.post('/user', signIn.sesion);
};
