const signIn = require('./controllers/signIn'),
  signUp = require('./controllers/signUp');

exports.init = app => {
  // app.get('/endpoint/get/path', [], controller.methodGET);
  app.post('./../migrations/user', [], signUp.sesion);
  app.post('./../migrations/user', [], signIn.signup);
};
