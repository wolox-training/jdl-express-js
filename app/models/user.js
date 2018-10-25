'use strict';

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
    eMail: {
      allowNull: false,
      isunique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
