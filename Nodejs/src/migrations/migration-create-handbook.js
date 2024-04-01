"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("handbooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      sapo: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("handbooks");
  },
};
