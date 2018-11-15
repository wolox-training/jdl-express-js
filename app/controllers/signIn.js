const _user = require('../models').user,
  token = require('jsonwebtoken'),
  secret = require('../../config'),
  crypt = require('bcryptjs');

const validpw = (password, askpasword) => {
  return crypt.compare(askpasword, password);
};

const giveToken = async email => {
  const time = parseInt(secret.common.session.validTime);
  const validt = await token.sign(
    {
      mailofuser: email
    },
    secret.common.session.secret,
    { expiresIn: time }
  );
  return validt;
};
const valid = req => {
  const usermail = req.body.email;
  return _user.findOne({ attributes: ['email', 'password'], where: { email: usermail } }).then(user => {
    const password = user.get('password');
    return validpw(password, req.body.password).then(validUser => {
      return validUser && usermail === user.email;
    });
  });
};

const autentication = req => {
  const usermail = req.body.email;
  return valid(req)
    .then(validSession => {
      if (validSession) return giveToken(usermail);
    })
    .catch(error => {
      throw error;
    });
};

exports.sesion = (req, res) => {
  const usermail = req.body;
  return _user.findAll({ where: { email: usermail.email } }).then(
    autentication(req)
      .then(tokenSesion => {
        return res
          .cookie('accesToken', tokenSesion)
          .send(tokenSesion)
          .status(200)
          .end();
      })
      .catch(err => {
        res.status(503);
        res.send(err);
      })
  );
};
