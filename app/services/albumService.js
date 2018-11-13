const fetch = require('node-fetch'),
  url = 'https://jsonplaceholder.typicode.com/';

exports.getAll = desired => {
  return desired
    ? fetch(`${url}albums/${desired}`).then(response => response.json())
    : fetch(`${url}albums/`).then(response => response.json());
};
