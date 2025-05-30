import { Model, DataTypes } from 'sequelize';


export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Driver, {
                foreignKey: 'user_id',
                as: 'driver',
            });
        }
    }

    User.init({
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
        modelName: 'User',
        tableName: 'Users',
        // underscored: true,
        timestamps: false,
    });

    return User;
};