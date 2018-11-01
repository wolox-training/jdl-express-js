const _user = require('./../models').user;

exports.userList = (req, res) => {
  const usermail = req.body.email;
  if (_user.findAll({ attributes: ['sesion'] }, { where: { email: usermail } })) {
    return _user
      .findAll({ attributes: ['name', 'lastName', 'email', 'role'] }, { limit: 5 })
      .then(userlist => {
        res.json(userlist).end();
      })
      .catch(err => {
        res.status(503);
        res.send(err);
      });
  } else res.status(401).send('Error, you need to sign In before performing this action');
};
