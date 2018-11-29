const graphql = require('graphql'),
  albumControll = require('./../controllers/albumController'),
  albumService = require('./../services/albumService'),
  fetch = require('node-fetch'),
  url = process.env.API_URL;

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
  albums: () => {
    return fetch(`${url}`).then(albm => {
      return albm.json();
    });
  }
};
