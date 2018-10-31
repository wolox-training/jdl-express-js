const _user = require('./../models').user;

exports.userList = (req, res) => {
  const usermail = req.body.email;
  // if (_user.findAll({ attributes: ['sesion'] }, { where: { email: usermail } })) {
  _user
    .findAll({ attributes: ['name', 'lastName', 'email', 'role'] }, { limit: 5 })
    .then(userlist => {
      res.json(userlist).end();
    })
    .catch(req.error)
    .throw(req.error);
  //  }
};
