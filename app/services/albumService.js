const fetch = require('node-fetch'),
  url = process.env.API_URL;

exports.getAll = () => {
  return fetch(url).then(response => response.json());
};
