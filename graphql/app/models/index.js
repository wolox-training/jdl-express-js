const Sequelize = require('sequelize'),
  config = require('../../config'),
  dbConfig = require('../../config/db')[config.environment],
  db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
