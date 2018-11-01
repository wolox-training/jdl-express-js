const _user = require('./../models/user'),
  token = require('jsonwebtoken'),
  secret = require('./../../config/index').config;

const giveToken = user => {
  return token.sign(
    {
      _user: user
    },
    secret.session.secret
  );
};
const valid = async req => {
  const usermail = req.body.email;
  const user = await _user.findAll({ attributes: ['email', 'password'] }, { where: { email: usermail } });
  return _user.validpw(user.password, req.body.password) && usermail === user.email;
};

const autentication = req => {
  const usermail = req.body.email;
  if (valid(req)) {
    return { 'valid-token': giveToken(usermail) };
  }
};

exports.sesion = async (req, res) => {
  const usermail = req.body.email;
  const user = await _user.findAll({ where: { email: usermail } });
  user.update({ sesion: true });
  user.save();
  return autentication(req)
    .then(tokenSesion => {
      res.json(tokenSesion);
    })
    .catch(err => {
      res.status(503);
      res.send(err);
    });
};
