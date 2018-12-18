'use strict';

const fs = require('fs'),
  path = require('path'),
  models = require('../app/models'),
  dataCreation = require('./../../trainning/scripts/dataCreation');

const getTablesQuery = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`;

// THIS WORKS ONLY WITH POSTGRESQL
beforeEach('drop tables, re-create them and populate sample data', done => {
  models.sequelize.query(getTablesQuery).then(tables => {
    const tableExpression = tables
      .map(table => {
        return `"public"."${table[0]}"`;
      })
      .join(', ');
    return models.sequelize
      .query(`TRUNCATE TABLE ${tableExpression} RESTART IDENTITY`)
      .then(() => {
        return dataCreation.execute();
      })
      .then(() => done());
  });
});

// including all test files
const normalizedPath = path.join(__dirname, '.');

const requireAllTestFiles = pathToSearch => {
  fs.readdirSync(pathToSearch).forEach(file => {
    if (fs.lstatSync(`${pathToSearch}/${file}`).isDirectory()) {
      requireAllTestFiles(`${pathToSearch}/${file}`);
    } else {
      require(`${pathToSearch}/${file}`);
    }
  });
};

requireAllTestFiles(normalizedPath);
