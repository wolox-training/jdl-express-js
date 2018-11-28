const fetch = require('node-fetch'),
  { buildSchema, graphql } = require('graphql'),
  albumController = require('./../controllers/albumController'),
  url = process.env.API_URL;

exports.schema = buildSchema(`
  type Query {
    getAlbum: [String]
  }
`);
exports.get = {
  _albums: () => {
    return fetch(`${url}`).then(response => response.json());
  }
};
exports.getAll = () => {
  return graphql(exports.schema, '{getAlbum}', albumController.getAlbums);
};

exports.getById = desired => {
  return fetch(`${url}/${desired}`).then(response => response.json());
};
exports.getPictures = id => {
  return fetch(`${url}/${id}/photos`).then(response => response.json());
};
