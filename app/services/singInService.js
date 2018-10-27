const express = require('express');

let singin;
const routerserv = express.Router;

// posting into users
routerserv.post('/user', function(user) {
  if (!singin.haserrors(user)) {
    // post on users table after encrypting the pw
    // log message
  } else {
    // log error message
  }
});
// # note: nothing really works here
