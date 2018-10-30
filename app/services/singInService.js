const user = require('./../models/user'),
  logger = require('./../logger'),
  singin = require('./../services/singInService');

exports.singup = (req, resp, err) => {
  if (err) logger.log(`error saving your data ${err}`);
  else {
    const newuser = user.build({
      name: req.body.name,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    newuser.save();
    resp.status(200);
    resp.send(newuser);
    resp.end();
    logger.log(`welcome! ${newuser.name} you are now registered and can log In`);
  }
};

exports.signuprole = (req, res, err) => {
  const _user = req.body;
  if (singin.exist(user)) {
    const mail = _user.email;
    const useradm = user.findAll({ where: { email: mail } });
  }
};
