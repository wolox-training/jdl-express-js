const user = require('./../models/user'),
  logger = require('./../logger'),
  singin = require('./../services/singInService');

// sign Up for with no role
exports.singup = (req, resp, err) => {
  if (err) logger.log(`error saving your data ${err}`);
  else {
    const newuser = user.build({
      name: req.body.name,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      sesion: false
    });
    newuser.save();
    logger.log(`welcome! ${newuser.name} you are now registered and can log In`);
    return newuser;
  }
};
