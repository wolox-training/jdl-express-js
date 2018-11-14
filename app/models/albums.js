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
    albums.belongsTo(models.user, { through: 'user' });
  };
  return albums;
};
