const crypt = require('bcryptjs'),
  _user = require('./../models/user'),
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
exports.exist = req => {
  const usermail = req.body.email;
  const user = _user.findAll({ where: { email: usermail } });
  return user == null;
};

exports.sesion = req => {
  const usermail = req.body.email;
  return _user.findAll({ attributes: ['sesion'] }, { where: { email: usermail } });
};

exports.admuser = (req, res, err) => {};
exports.signup = (req, res, err) => {
  if (err) res.send(err);
  else {
    this.validateReq(req);
    req.body.password = this.hashPassword(req.body.password);
    if (!this.hasErrors(req.body)) {
      res
        .send(service.singup(req, res, err))
        .status(200)
        .end();
    } else
      res
        .send('error, Invalid data, this could either be a problem with your email or your password.')
        .status(200)
        .end();
  }
};
