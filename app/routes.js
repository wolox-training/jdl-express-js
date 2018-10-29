const signIn = require('./services/singInService');

exports.init = app => {
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  app.post('/endpoint/post/path', [], signIn.signup);
};
