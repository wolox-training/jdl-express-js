const { GraphQLNonNull, GraphQLBoolean, GraphQLString } = require('graphql'),
  { userInputType, logInInputType } = require('./types'),
  fetch = require('node-fetch');

exports.createUser = {
  description: 'creates a new user',
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const user = await fetch('http://localhost:3001/user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return true;
  }
};

exports.logIn = {
  description: 'starts a new session',
  type: GraphQLString,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(logInInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const session = await fetch('http://localhost:3001/user/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async dat => {
      return dat;
    });
    const Cookies = session.headers.get('set-cookie').split(';')[0];
    const token = Cookies.substring(11);
    context.res.header('accesToken', token);
    return session.text();
  }
};
