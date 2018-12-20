const { GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql'),
  { listOfUserType } = require('./types'),
  fetch = require('node-fetch');

exports.userList = {
  description: 'it returns a list of users',
  type: listOfUserType,
  args: {
    page: {
      name: 'page',
      type: GraphQLNonNull(GraphQLInt)
    },
    limit: {
      name: 'limit',
      type: GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: async (obj, data, context, info) => {
    const list = await fetch('http://localhost:3001/listOfUsers', {
      method: 'GET',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'accestoken': context.headers.accestoken
      }
    }).then(dat => {
      return dat.json();
    });
    console.log(`############################${list.rows}`);
    return list;
  }
};
