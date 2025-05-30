import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Driver extends Model {
    static associate(models) {
      Driver.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  Driver.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    vehicleMake: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vehicleModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM('AVAILABLE', 'UNAVAILABLE'),
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Driver',
    tableName: 'Drivers',
    // underscored: true,
    timestamps: false,
  });

  return Driver;
};
