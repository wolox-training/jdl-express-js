const _user = require('./../models/user'),
  service = require('./../services/singUpService'),
  token = require('jsonwebtoken');

exports.giveToken = user => {
  return token.sign({
    _user: user
  });
};
exports.valid = req => {
  const usermail = req.body.email;
  const user = _user.findAll({ attributes: ['email', 'password'] }, { where: { email: usermail } });
  return _user.validpw(user.password, req.body.password) && usermail === user.email;
};

exports.sesion = (req, res, err) => {
  if (err) res.send(err);
  else {
    res.send(service.autentication(req, res, err));
    res.status(200);
    res.end();
  }
};
