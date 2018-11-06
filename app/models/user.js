'use strict';

const crypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
      allowNull: true,
      type: DataTypes.STRING
    },
    sesion: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};

exports.validpw = (password, askpasword) => {
  return crypt.compare(password, askpasword);
};

exports.findWhereParam = (atributes, parameters) => {
  return this.findAll({ attributes: [atributes] }, { where: { parameters } });
};

exports.findWhere = parameters => {
  return this.findAll({ where: { parameters } });
};
