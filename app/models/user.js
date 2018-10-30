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
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sesion: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};

module.exports.validpw = (password, askpasword) => {
  return crypt.compare(password, askpasword);
};
