import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs'

export default (sequelize) => {

    class Driver extends Model { }

    Driver.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        passwordHash: {
            type: DataTypes.STRING,
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
            unique: true
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
        hooks:
        {
            beforeCreate: async (driver) => {
                driver.passwordHash = await bcrypt.hash(driver.passwordHash, 10)
            },

            beforeUpdate: async (driver) => {
                if (!user.changed('passwordHash')) return
                driver.passwordHash = await bcrypt.hash(driver.passwordHash, 10)
            }
        }
    });

    return Driver;
};
