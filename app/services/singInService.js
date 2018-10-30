const user = require('./../models/user'),
  logger = require('./../logger');

// posting on users
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
    resp.end();
    logger.log(`welcome! ${newuser.name} you are now registered and can log In`);
  }
};
