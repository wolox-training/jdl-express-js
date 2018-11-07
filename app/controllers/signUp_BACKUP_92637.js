const crypt = require('bcryptjs'),
<<<<<<< HEAD:app/controllers/singIn.js
  _user = require('./../models').user,
  usController = require('./userController');
=======
  _user = require('../models').user;
>>>>>>> master:app/controllers/signUp.js

const validEmail = email => {
  const emailRexEx = new RegExp('[a-zA-Z]+@wolox+?.[a-zA-Z]{2,3}$');
  return emailRexEx.test(email);
};
const validPassword = password => {
  return password.length === 8;
};
const hasNoErrors = user => {
  return validEmail(user.email) && validPassword(user.password);
};

const hashPassword = password => {
  return crypt.hash(password, 10);
};

exports.admUser = (req, res) => {
  const userToUpdate = req.body.updUser;
  const userUpdater = req.body.userUpdater;
  return usController.exist(userToUpdate).then(exist => {
    if (!exist) {
      return exports
        .signUp(userToUpdate)
        .then(created => {
          res.json(created).end();
        })
        .catch(req.error)
        .throw(req.error);
    } else {
      return usController.authenticated(userUpdater).then(userauth => {
        if (userauth) {
          return usController.isAdmin(userUpdater).then(admin => {
            if (admin) {
              return _user
                .findAll({ where: { email: userToUpdate.email } })
                .then(user => {
                  return user.update({ role: ' admin ' });
                })
                .then(res.send(`the user ${userToUpdate} now has the role Admin`).status(200));
            } else {
              return res
                .send(
                  `Error. credential no found, please make sure that ${userUpdater}, has an active session and is an admin`
                )
                .status(401);
            }
          });
        }
      });
    }
  });
};

exports.signUp = async (req, res) => {
  const user = req.body;
  if (hasNoErrors(user)) {
    const encryptpw = await hashPassword(user.password);
    return _user
      .create({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: encryptpw,
        role: user.role,
        sesion: false
      })
      .then(created => {
        res.json(created).end();
      })
      .catch(err => {
        res.status(503);
        res.send(err);
      });
  } else
    res.send('error, Invalid data, this could either be a problem with your email or your password.').end();
};
