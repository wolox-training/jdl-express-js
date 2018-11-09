const _user = require('./../models').user,
  jwt = require('jsonwebtoken'),
  secretk = require('../../config/index').config;

const exist = usermail => {
  return _user.findAll({ where: { email: usermail } }).then(user => {
    return !!user;
  });
};

const isAdmin = user => {
  const usermail = user.email;
  return _user.findAll({ params: ['role'] }, { where: { email: usermail } }).then(role => {
    return role === 'admin';
  });
};

exports.authenticated = req => {
  const token = req.cookie;
  return jwt.verify(token, secretk.session.secret).then(decoded => {
    return exist(decoded);
  });
};
