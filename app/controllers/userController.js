const _user = require('./../models').user,
  jwt = require('jsonwebtoken'),
  secretk = require('../../config');

const exist = usermail => {
  return _user.findAll({ where: { email: usermail } }).then(user => {
    return user;
  });
};

exports.getId = user => {
  const usertoken = user.accestoken;
  const usermail = jwt.verify(usertoken, secretk.common.session.secret);
  return _user.findAll({ attributes: ['id'], where: { email: usermail.mailofuser }, raw: true }).then(id => {
    return id[0].id;
  });
};

exports.isAdmin = user => {
  const usermail = user.email;
  return _user.findAll({ attributes: ['role'], where: { email: usermail } }).then(role => {
    return role === 'admin';
  });
};

exports.authenticated = req => {
  const token = req.headers.accestoken;
  const decoded = jwt.verify(token, secretk.common.session.secret);
  return exist(decoded.mailofuser);
};
