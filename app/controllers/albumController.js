const usControl = require('./userController'),
  albumService = require('./../services/albumService');

exports.getAlbums = (req, res) => {
  return usControl.authenticated(req).then(auth => {
    if (auth) {
      albumService
        .getAll(req)
        .then(jsonres => {
          return res
            .json(jsonres)
            .status(200)
            .end();
        })
        .catch(error => {
          res.send(`error: ${error}`).status(503);
        });
    } else {
      res
        .send('unauthorized acces, you must log In before performing this action')
        .status(401)
        .end();
    }
  });
};
