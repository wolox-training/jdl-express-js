const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

exports.userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

exports.userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

exports.logInType = new GraphQLObjectType({
  name: 'logInInformation',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: { type: GraphQLString }
  }
});
exports.logInInputType = new GraphQLInputObjectType({
  name: 'logInInputInformation',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: { type: GraphQLString }
  }
});
