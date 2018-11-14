const fetch = require('node-fetch'),
  url = process.env.API_URL;

exports.getAll = () => {
  return fetch(`${url}/albums`).then(response => response.json());
};
exports.getById = desired => {
  return fetch(`${url}/${desired}`).then(response => response.json());
};
