const fetch = require('node-fetch'),
  url = process.env.API_URL;

exports.getAll = () => {
  return fetch(`${url}/albums`).then(response => response.json());
};
exports.getById = desired => {
  return fetch(`${url}/${desired}`).then(response => response.json());
};
exports.getPictures = id => {
  return fetch(`${url}/${id}/photos`).then(response => response.json());
};
exports.getAllPictures = () => {
  return fetch(`${url}/photos`).then(response => response.json());
};
