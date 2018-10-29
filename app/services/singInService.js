const express = require('express'),
  user = require('./../models/user'),
  logger = require('./../logger'),
  singin = require('./../services/singInService');

// posting on users
exports.singup = (req, resp, err) => {
  singin.validateReq(req);
  if (err) logger.log(`error saving your data ${err}`);
  else {
    const newuser = user.build({
      name: req.body.name,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    if (!singin.haserrors(newuser)) singin.hashPassword(newuser);
    else logger.log('error validating data conditions');
    newuser.save();
    resp.status(200);
    resp.end();
    logger.log(`welcome! ${newuser.name} you are now registered and can log In`);
  }
};
