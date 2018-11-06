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
    _user.validpw(user.password, req.body.password).then(validUser => {
      return validUser && usermail === user.email;
    });
  });
};

const autentication = req => {
  const usermail = req.body.email;
  return valid(req)
    .then(validSession => {
      if (validSession) return { 'valid-token': giveToken(usermail) };
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
          res
            .cookie(tokenSesion)
            .status(200)
            .end();
        })
        .catch(err => {
          res.status(503);
          res.send(err);
        })
    );
};
