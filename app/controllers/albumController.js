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
            .send(
              `badGateway, the Album provider API is not available, please try again in a few minutes... error ${error}`
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
  return _album.findAll({ where: { albumId: AlbumId, userId: UserId } }).then(album => {
    return album;
  });
};

const pickAlbum = req => {
  const id = req.params.id;
  return albumService
    .getById(id)
    .then(albumList => {
      return albumList;
    })
    .catch(error => {
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

exports.purchasedAlbums = (req, res) => {
  return usControl.authenticated(req).then(authenticated => {
    if (authenticated) {
      return usControl.isAdmin(req).then(isadmin => {
        if (isadmin) {
          return _album
            .findAll({ attributes: ['albumId', 'title', 'userId'] })
            .then(userlist => {
              return res.json(userlist).end();
            })
            .catch(err => {
              res.status(503);
              res.send(err).end();
            });
        } else {
          return _album
            .findAll({ attributes: ['albumId', 'title', 'userId'], where: { userId: req.params.userId } })
            .then(listOfAlbums => {
              return res.json(listOfAlbums).end();
            });
        }
      });
    } else
      return res
        .status(401)
        .send('Error, you need to sign In before performing this action')
        .end();
  });
};

exports.albumPictures = (req, res) => {
  const id = req.params.id;
  return usControl.authenticated(req).then(authenticated => {
    if (authenticated) {
      return usControl.isAdmin(req).then(isadmin => {
        if (isadmin) {
          return albumService.getAllPictures().then(pictureList => {
            res.json(pictureList).end();
          });
        } else {
          return usControl
            .getId(req.headers)
            .then(userid => {
              return exist(id, userid).then(purchasedAlbums => {
                if (purchasedAlbums.length !== 0) {
                  return albumService.getPictures(id).then(res.json(res).end());
                } else {
                  res.send('you havent purchased this album').status(401);
                }
              });
            })
            .catch(error => {
              res.send(`an error ocurred: ${error}, please verify and retry`).status(401);
            });
        }
      });
    } else {
      return res
        .status(401)
        .send('Error, you need to sign In before performing this action')
        .end();
    }
  });
};
