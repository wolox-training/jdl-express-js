const express = require('express');
const crypt = require('bcrypt');

let user;
let singin;
const routerserv = express.Router;

const hashPassword = _user => {
  crypt.hash(_user.password, 10, function(err, hash) {
    if (err) console.log('error during password hash');
    else _user.password = hash;
  });
};
const validateReq = request => {
  const name = request.body.name;
  const lastname = request.body.lastName;
  const eMail = request.body.eMail;
  const password = request.body.password;

  request.checkBody('name', 'field Name is required').notEmpty();
  request.checkBody('lastName', 'field lastName is required').notEmpty();
  request.eMail('eMail', 'field eMail is required').notEmpty();
  request.password('password', 'field password is required').notEmpty();
};
// posting on users
routerserv.post('/users', function(req, err) {
  validateReq(req);
  if (err) console.log(`error saving your data ${err}`);
  else {
    const newuser = user.build({
      name: req.body.name,
      lastname: req.body.lastName,
      eMail: req.body.eMail,
      password: req.body.password
    });
    if (!singin.haserrors(newuser)) hashPassword(newuser);
    else console.log('error validating data conditions');
    newuser.save();
  }
});
