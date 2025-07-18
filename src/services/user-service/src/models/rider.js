import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'


export default (sequelize) => {
    class Rider extends Model { }

    Rider.init({
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
        modelName: 'Rider',
        tableName: 'Riders',
        // underscored: true,
        timestamps: false,

        hooks: {
            beforeCreate: async (rider) => {
                rider.passwordHash = await bcrypt.hash(rider.passwordHash, 10)
            },

            beforeUpdate: async (rider) => {
                if (!rider.changed('passwordHash')) return
                rider.passwordHash = await bcrypt.hash(rider.passwordHash, 10)
            }
        }
    });

    return Rider;
};
