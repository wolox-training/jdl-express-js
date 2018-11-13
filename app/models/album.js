'use strict';

module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('album', {
    name: DataTypes.STRING,
    userid: DataTypes.INTEGER
  });
  album.associate = function(models) {
    album.belongsTo(models.user, { foreingKey: 'userid' });
  };
  return album;
};
