const usControl = require('./userController'),
  albumService = require('./../services/albumService'),
  _album = require('./../models/').albums;

exports.getAlbums = {
  getAlbum: (req, res) => {
    return usControl.authenticated(req).then(auth => {
      if (auth) {
        return albumService.get
          ._albums()
          .then(jsonres => {
            return res
              .json(jsonres)
              .status(200)
              .end();
          })
          .catch(error => {
            res
              .send(
                `badGateway, the Album provider API is not available, please try again in a few minutes error ${error}`
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
  }
};

const exist = (AlbumId, UserId) => {
  return _album.findAll({ where: { albumId: AlbumId, userId: UserId } });
};

const pickAlbum = req => {
  const id = req.params.id;
  return albumService.getById(id).catch(error => {
    throw error;
  });
};
exports.purchaseAlbum = (req, res) => {
  return pickAlbum(req).then(album => {
    return usControl
      .getId(req.headers)
      .then(id => {
        return exist(album.id, id[0].id).then(purchasedAlbums => {
          if (!purchasedAlbums.length) {
            return _album
              .create({
                albumId: album.id,
                name: album.title,
                userId: id[0].id
              })
              .then(
                res
                  .send(`the album was purchased!`)
                  .status(200)
                  .end()
              )
              .catch(error => {
                error('there has been an authentication problem:', error).status;
              });
          } else {
            res.send('this album has been purchased before, please pick anotherone').status(401);
          }
        });
      })
      .catch(error => {
        res.send(`an error ocurred: ${error}, please verify and retry`).status(401);
      });
  });
};

exports.purchasedAlbums = (req, res) => {
  return usControl.authenticated(req).then(authenticated => {
    if (authenticated) {
      return usControl.isAdmin(req).then(isadmin => {
        const query = { attributes: ['albumId', 'title', 'userId'] };
        if (!isadmin) query.where = { userId: req.params.userId };
        return _album.findAll(query).then(listalbum => {
          res
            .json(listalbum)
            .status(200)
            .end();
        });
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
  return usControl
    .authenticated(req)
    .then(authenticated => {
      if (authenticated) {
        return usControl.isAdmin(req).then(isadmin => {
          return albumService.getPictures(id).then(pictures => {
            if (!isadmin) {
              return usControl
                .getId(req.headers)
                .then(userid => {
                  return exist(id, userid).then(purchasedAlbums => {
                    if (!purchasedAlbums.length) {
                      res.json(pictures).end();
                    } else {
                      res.send('you havent purchased this album').status(401);
                    }
                  });
                })
                .catch(error => {
                  res.send(`an error ocurred: ${error}, please verify and retry`).status(401);
                });
            } else res.json(pictures).end();
          });
        });
      } else {
        return res
          .status(401)
          .send('Error, you need to sign In before performing this action')
          .end();
      }
    })
    .catch(error => {
      if (error.message === 'jwt must be provided') {
        res
          .send('you need to log in')
          .status(401)
          .end();
      } else {
        res
          .send(`an unexpected error ocurred: ${error}`)
          .status(401)
          .end();
      }
    });
};
