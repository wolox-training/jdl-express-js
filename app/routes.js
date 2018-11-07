const signIn = require('./controllers/singIn'),
  listOfUsers = require('./controllers/userList');

exports.init = app => {
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  app.post('/user', signIn.signUp);
  app.post('admin/user', signIn.admUser);
};
