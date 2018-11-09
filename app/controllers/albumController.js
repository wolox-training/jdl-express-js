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
          throw new Error(
            'badGateway, the Album provider API is not available, please try again in a few minutes'
          ).code(503);
        });
    } else {
      res
        .send('unauthorized acces, you must log In before performing this action')
        .status(401)
        .end();
    }
  });
};
