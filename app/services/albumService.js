const fetch = require('node-fetch'),
  url = process.env.API_URL,
  creationUrl = process.env.API_CREATION_URL;

exports.getAll = () => {
  return fetch(`${url}`).then(response => response.json());
};
exports.getById = desired => {
  return fetch(`${url}/${desired}`).then(response => response.json());
};
exports.getPictures = id => {
  return fetch(`${url}/${id}/photos`).then(response => response.json());
};
exports.create = param => {
  return fetch(`${creationUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title: param.title,
      body: '',
      userId: 1
    })
  }).then(response => {
    return response.json();
  });
};
