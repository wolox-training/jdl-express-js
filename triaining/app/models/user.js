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
    User.belongsToMany(models.users_albums, { through: 'user_id' });
  };

  return User;
};

exports.validpw = (password, askpasword) => {
  return crypt.compare(askpasword, password);
};
