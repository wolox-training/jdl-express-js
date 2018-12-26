const { GraphQLNonNull, GraphQLString } = require('graphql'),
  { userInputType } = require('./types'),
  fetch = require('node-fetch');

exports.createUser = {
  description: 'creates a new user',
  type: GraphQLString,
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
    return user.text();
  }
};
