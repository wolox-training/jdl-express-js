'use strict';

const crypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      isunique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      isAlphanumeric: true,
      type: DataTypes.STRING
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};

module.exports.validpw = async (password, askpasword) => {
  await crypt.compare(password, askpasword);
};
