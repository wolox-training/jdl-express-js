const _user = require('./../models').user,
  jwt = require('jsonwebtoken'),
  secretk = require('../../config');

const exist = usermail => {
  return _user.findAll({ where: { email: usermail } }).then(user => {
    return user;
  });
};

exports.getId = async user => {
  const usertoken = user.accestoken;
  const usermail = await jwt.verify(usertoken, secretk.common.session.secret);
  return _user.findAll({ attributes: ['id'], where: { email: usermail.mailofuser }, raw: true });
};

exports.isAdmin = user => {
  const usermail = user.email;
  return _user.findAll({ attributes: ['role'], where: { email: usermail } }).then(role => {
    return role === 'admin';
  });
};

exports.authenticated = req => {
  const token = req.headers.accestoken;
  return jwt
    .verify(token, secretk.common.session.secret)
    .then(decoded => {
      return exist(decoded.mailofuser);
    })
    .catch(error => {
      if (error === 'TokenExpiredError') {
        return error.message;
      } else return `an unexpected error ocurred ${error}`;
    });
};

exports.disableAll = req => {
  return exports.authenticated(req).then(user => {
    user.update({ session: false });
  });
};
