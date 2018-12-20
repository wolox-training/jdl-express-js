const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

exports.userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});
exports.listOfUserType = new GraphQLObjectType({
  name: 'listOfUsers',
  fields: {
    count: {
      type: GraphQLInt
    },
    rows: { type: new GraphQLList(exports.userType) }
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
