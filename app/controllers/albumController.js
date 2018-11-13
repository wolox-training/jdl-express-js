const usControl = require('./userController'),
  albumService = require('./../services/albumService'),
  _album = require('./../models/').album;

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
  const id = req.params.id;
  return albumService
    .getAll(req)
    .then(albumList => {
      console.log(`======================================${albumList}`);
      return albumList;
    })
    .catch(error => {
      throw error;
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
                name: album.name,
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
        res.send(`an error ocurred: ${error}, please verify you are logged in and retry`).status(401);
      });
  });
};
