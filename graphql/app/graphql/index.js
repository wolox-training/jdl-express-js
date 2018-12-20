const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
  books = require('./books'),
  users = require('./users');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...books.queries,
      ...users.queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...books.mutations,
      ...users.mutations
    }
  })
});
