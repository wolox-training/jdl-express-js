/* eslint-disable camelcase */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const users_albums = sequelize.define(
    'users_albums',
    {
      UserId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER
    },
    {}
  );
  users_albums.associate = function(models) {};
  return users_albums;
};
