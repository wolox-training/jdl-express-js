const _user = require('./../models').user,
  jwt = require('jsonwebtoken'),
  secretk = require('../../config');

const exist = usermail => {
  return _user.findOne({ where: { email: usermail }, raw: true }).then(user => {
    return user;
  });
};

exports.getId = async user => {
  const usertoken = user.accestoken;
  const usermail = await jwt.verify(usertoken, secretk.common.session.secret);
  return _user.findAll({ attributes: ['id'], where: { email: usermail.mailofuser }, raw: true });
};

exports.isAdmin = user => {
  const usermail = user.headers.accestoken;
  return _user.findAll({ attributes: ['role'], where: { email: usermail } }).then(role => {
    return role === 'admin';
  });
};
exports.authenticated = async req => {
  const validauth = await exports.isAuthenticated(req);
  const active = await exports.activeSession(req);
  return validauth && active[0].sesion;
};
exports.isAuthenticated = async req => {
  const token = req.headers.accestoken;
  try {
    const decoded = await jwt.verify(token, secretk.common.session.secret);
    return exist(decoded.mailofuser);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return false;
    } else return `an unexpected error ocurred: ${error}`;
  }
};
exports.activeSession = req => {
  return exports.isAuthenticated(req).then(user => {
    return _user
      .findAll({ attributes: ['sesion'], where: { email: user.email }, raw: true })
      .then(session => {
        return session;
      });
  });
};
exports.disableAll = (req, res) => {
  return exports.isAuthenticated(req).then(user => {
    return _user.update({ sesion: false }, { where: { email: user.email } }).then(() => {
      res
        .send('the user is now inactive')
        .status(200)
        .end();
    });
  });
};
