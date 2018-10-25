'use strict';

require('sequelize-isunique-validator');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Apellido: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        isunique: true,
        type: Sequelize.STRING
      },
      Contrasena: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
