const crypt = require('bcryptjs'),
  service = require('./../services/singInService');

exports.validEmail = email => {
  const emailRexEx = new RegExp('^w+@wolox+?.[a-zA-Z]{2,3}$');
  return !!emailRexEx.test(email);
};
exports.validPassword = password => {
  return password.lengh() === 8;
};
exports.hasErrors = user => {
  return !(this.validEmail(user.email) && this.validPassword(user.password));
};

exports.hashPassword = password => {
  return crypt.hash(password, 10);
};
exports.validateReq = request => {
  const { name, lastName, email, password } = request.body;

  request.checkBody('name', 'field Name is required').notEmpty();
  request.checkBody('lastName', 'field lastName is required').notEmpty();
  request.checkBody('email', 'field email is required').notEmpty();
  request.checkBody('password', 'field password is required').notEmpty();
};
exports.signup = (req, res, err) => {
  this.validateReq(req);
  req.body.password = this.hashPassword(req.body.password);
  if (!this.hasErrors) {
    if (err) res.status(500).send(err);
    else {
      res.send(service.singup(req, res, err));
      res.status(200);
      res.end();
    }
  }
};
