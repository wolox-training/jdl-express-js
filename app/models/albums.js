'use strict';

module.exports = (sequelize, DataTypes) => {
  const albums = sequelize.define(
    'albums',
    {
      albumId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING
    },
    {}
  );
  albums.associate = function(models) {
    albums.belongsToMany(models.users_albums, { through: 'album_id' });
  };
  return albums;
};
