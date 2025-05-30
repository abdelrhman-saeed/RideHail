'use strict'

/**
 * @param {import('sequelize').QueryInterface} queryInterface 
 * @param {import('sequelize').Sequelize} Sequelize 
 */
export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable('Users', {

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

    userType: {
      type: Sequelize.ENUM('rider', 'driver'),
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
  return queryInterface.dropTable('Users');
}
