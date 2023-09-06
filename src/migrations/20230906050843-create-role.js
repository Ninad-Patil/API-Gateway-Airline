"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Enums } = require("../utils/common");
const { ADMIN, FLIGHT_COMPANY, CUSTOMER } = Enums.USER_ROLES_ENNUMS;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [ADMIN, FLIGHT_COMPANY, CUSTOMER],
        defaultValue: CUSTOMER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Roles");
  },
};
