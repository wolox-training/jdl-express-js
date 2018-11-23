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
  const validauth = await exports.isauthenticated(req);
  const active = await exports.activesesion(req);
  return validauth && active[0].sesion;
};
exports.isauthenticated = async req => {
  const token = req.headers.accestoken;
  try {
    const decoded = await jwt.verify(token, secretk.common.session.secret);
    return exist(decoded.mailofuser);
  } catch (error) {
    if (error === 'TokenExpiredError') {
      return error.message;
    } else return `an unexpected error ocurred: ${error}`;
  }
};
exports.activesesion = req => {
  return exports.isauthenticated(req).then(user => {
    return _user
      .findAll({ attributes: ['sesion'], where: { email: user.email }, raw: true })
      .then(session => {
        return session;
      });
  });
};
exports.disableAll = (req, res) => {
  return exports.isauthenticated(req).then(user => {
    return _user.update({ sesion: false }, { where: { email: user.email } }).then(() => {
      res
        .send('the user is now inactive')
        .status(200)
        .end();
    });
  });
};
