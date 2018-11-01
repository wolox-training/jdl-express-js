const _user = require('./../models').user;

exports.userList = async (req, res) => {
  const usermail = req.body.email;
  if (await _user.findAll({ attributes: ['sesion'] }, { where: { email: usermail } }).data) {
    const limit = req.body.limit;
    const pages = req.body.page;
    return _user
      .findAndCountAll(
        { attributes: ['name', 'lastName', 'email', 'role'] },
        { limit, offset: limit * (pages - 1) }
      )
      .then(userlist => {
        const numberOfUsers = userlist.count;
        const page = Math.ceil(numberOfUsers / limit);
        res.json(userlist, { numberOfUsers }, { numberOfPages: page }).end();
      })
      .catch(err => {
        res.status(503);
        res.send(err);
      });
  } else res.status(401).send('Error, you need to sign In before performing this action');
};
