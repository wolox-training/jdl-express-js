const _user = require('./../models').user,
  jwt = require('jsonwebtoken'),
  secretk = require('../../config/index').config;

const exist = usermail => {
  return _user.findWhere({ email: usermail }).then(user => {
    user !== null || user !== undefined;
  });
};

const isAdmin = async user => {
  const usermail = user.email;
  return _user.findWhereParam(['role'], { email: usermail }).then(role => {
    role === 'admin';
  });
};

const authenticated = req => {
  const token = req.cookie;
  return jwt.verify(token, secretk.session.secret).then(decoded => {
    exist(decoded);
  });
};
