'use strict'

/**
 * @param {import('sequelize').QueryInterface} queryInterface 
 * @param {import('sequelize').Sequelize} Sequelize 
 */
export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable('Drivers', {

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    },

    vehicleMake: {
      type: Sequelize.STRING,
      allowNull: false
    },

    vehicleModel: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    licensePlate: {
      type: Sequelize.STRING,
      unique: true,
    },

    status: {
        type: Sequelize.ENUM('AVAILABLE', 'UNAVAILABLE'),
        allowNull: false
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  })
}

export async function down(queryInterface, sequelize) {
  return queryInterface.dropTable('Drivers');
}
