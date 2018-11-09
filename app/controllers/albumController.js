const usControl = require('./userController'),
  albumService = require('./../services/albumService'),
  _album = require('./../models/').album;

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

const exist = albumId => {
  return _album.findAll({ where: { id: albumId } }).then(album => {
    return !!album;
  });
};

const pickAlbum = req => {
  return exports
    .getAlbums(req)
    .then(albumList => {
      return albumList.albumId;
    })
    .catch(error => {
      error('Error picking the desired album:', error);
    });
};
exports.purchaseAlbum = (req, res) => {
  return pickAlbum(req).then(album => {
    return exist(album.id)
      .then(validPurchase => {
        if (validPurchase) {
          return usControl.getId(req.header).then(id => {
            _album
              .create({
                name: req.body.name,
                userid: id
              })
              .then(
                res
                  .send(`the album ${req.body.name} was purchased!`)
                  .status(200)
                  .end()
              )
              .catch(error => {
                error('there has been an authentication problem:', error);
              });
          });
        } else {
          res.send('this album has been purchased before, please pick anotherone').status(401);
        }
      })
      .catch(error => {
        error(`an error ocurred: ${error}, please verify you are logged in and retry`);
      });
  });
};
