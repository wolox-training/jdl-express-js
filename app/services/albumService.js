const fetch = require('node-fetch'),
  url = 'https://jsonplaceholder.typicode.com/';

exports.getAll = () => {
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response => response.json());
};
