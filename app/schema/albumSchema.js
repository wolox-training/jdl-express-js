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
  delete(id:Int): String
  }
`);
exports.root = {
  albums: (args, req) => {
    return albumControll.getAlbums(req).then(response => {
      return response;
    });
  },
  delete: (args, req) => {
    return albumControll.deleteAlbum(req, args).then(response => {
      return response;
    });
  }
};
