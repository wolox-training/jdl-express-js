const _user = require('./../models/user'),
  token = require('jsonwebtoken');

const giveToken = user => {
  return token.sign({
    _user: user
  });
};
const valid = req => {
  const usermail = req.body.email;
  const user = _user.findAll({ attributes: ['email', 'password'] }, { where: { email: usermail } });
  return _user.validpw(user.password, req.body.password) && usermail === user.email;
};

const autentication = (req, res) => {
  const usermail = req.body.email;
  if (valid(req)) {
    const validation = giveToken(usermail);
    return ['valid-token', validation];
  }
};

exports.sesion = (req, res) => {
  const usermail = req.body.email;
  const user = _user.findAll({ where: { email: usermail } });
  user.update({ sesion: true });
  user.save();
  return autentication(req, res)
    .then(tokenSesion => {
      res.json(tokenSesion);
    })
    .catch(err => {
      res.status(503);
      res.send(err);
    });
};
