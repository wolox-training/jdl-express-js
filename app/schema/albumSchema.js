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
  }
`);
exports.root = {
  albums: (args, req) => {
    return albumControll.getAlbums(req)
  }
};
