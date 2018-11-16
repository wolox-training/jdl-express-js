const usControl = require('./userController'),
  albumService = require('./../services/albumService'),
  _album = require('./../models/').albums;

exports.getAlbums = (req, res) => {
  return usControl.authenticated(req).then(auth => {
    if (auth) {
      albumService
        .getAll()
        .then(jsonres => {
          return res
            .json(jsonres)
            .status(200)
            .end();
        })
        .catch(error => {
          res
            .send('badGateway, the Album provider API is not available, please try again in a few minutes')
            .status(503);
          res
            .send(
              `badGateway, the Album provider API is not available, please try again in a few minutes error: ${error}`
            )
            .status(503);
        });
    } else {
      res
        .send('unauthorized acces, you must log In before performing this action')
        .status(401)
        .end();
    }
  });
};

const exist = (AlbumId, UserId) => {
  _album.findAll({ where: { albumId: AlbumId, userId: UserId } });
};

const pickAlbum = req => {
  const id = req.params.id;
  albumService.getById(id).catch(error => {
    throw error;
  });
};
exports.purchaseAlbum = (req, res) => {
  return pickAlbum(req).then(album => {
    return usControl
      .getId(req.headers)
      .then(id => {
        return exist(album.id, id).then(purchasedAlbums => {
          if (purchasedAlbums.length === 0) {
            return _album
              .create({
                albumId: album.id,
                name: album.title,
                userId: id
              })
              .then(
                res
                  .send(`the album ${album.title} was purchased!`)
                  .status(200)
                  .end()
              )
              .catch(error => {
                error('there has been an authentication problem:', error);
              });
          } else {
            res.send('this album has been purchased before, please pick anotherone').status(401);
          }
        });
      })
      .catch(error => {
        res.send(`an error ocurred: ${error}, please verify you are logged in and retry`).status(401);
      });
  });
};
