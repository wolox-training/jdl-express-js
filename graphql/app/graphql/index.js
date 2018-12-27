const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
  users = require('./users');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...users.users
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...users.mutations
    }
  })
});
