const _user = require('../models/user'),
  token = require('jsonwebtoken'),
  secret = require('../../config/index').config;

const giveToken = user => {
  return token.sign(
    {
      _user: user
    },
    secret.session.secret
  );
};
const valid = req => {
  const usermail = req.body.email;
  return _user.findAll({ attributes: ['email', 'password'] }, { where: { email: usermail } }).then(user => {
    _user.validpw(user.password, req.body.password) && usermail === user.email;
  });
};

const autentication = req => {
  const usermail = req.body.email;
  return valid(req)
    .then(cookie => {
      cookie = { 'valid-token': giveToken(usermail) };
    })
    .catch(error => {
      throw error;
    });
};

exports.sesion = (req, res) => {
  const usermail = req.body.email;
  return _user
    .findAll({ where: { email: usermail } })
    .then(user => {
      user.update({ sesion: true });
    })
    .then(
      autentication(req)
        .then(tokenSesion => {
          res.cookie(tokenSesion);
        })
        .catch(err => {
          res.status(503);
          res.send(err);
        })
    );
};
