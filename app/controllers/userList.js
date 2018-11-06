const _user = require('./../models').user,
  userControl = require('./../controllers/userController');

exports.userList = async (req, res) => {
  userControl.authenticated(req).then(authenticated => {
    if (authenticated) {
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
  });
};
