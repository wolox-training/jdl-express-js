const _user = require('./../models').user,
  jwt = require('jsonwebtoken'),
  secretk = require('../../config/index').config;

const exist = usermail => {
  const user = _user.findAll({ where: { email: usermail } });
  return user == null;
};

const activeSesion = async req => {
  const usermail = req.body.email;
  const active = await _user.findAll({ attributes: ['sesion'] }, { where: { email: usermail } });
  return active;
};

const isAdmin = async user => {
  const usermail = user.email;
  const role = await _user.findAll({ attributes: ['role'] }, { where: { email: usermail } });
  return role === 'admin';
};

const authenticated = req => {
  if (activeSesion(req)) {
    const token = req.cookie;
    return jwt.verify(token, secretk.session.secret).then(decoded => {
      exist(decoded);
    });
  }
};
