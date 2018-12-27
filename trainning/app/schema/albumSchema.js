const graphql = require('graphql'),
  albumControll = require('./../controllers/albumController');

const { buildSchema } = graphql;

exports.schema = buildSchema(`
  type album {
    id: String,
    title: String
  },
  type Query {
      albums: [album]
  },
  type Mutation{
  delete(id:Int): String,
  create(title:String): album
  },
`);
exports.root = {
  albums: (args, req) => {
    return albumControll.getAlbums(req);
  },
  delete: (args, req) => {
    return albumControll.deleteAlbum(req, args);
  },
  create: (args, req) => {
    return albumControll.createAlbum(req, args);
  }
};
