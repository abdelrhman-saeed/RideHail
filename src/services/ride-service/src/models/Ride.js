import { Model, DataTypes } from 'sequelize';


class Ride extends Model {

    static init(sequelize) {

        return super.init({

            rider_id:  { type: DataTypes.BIGINT, allowNull: false },
            driver_id: { type: DataTypes.BIGINT, allowNull: true },

            pickup_latitude:  { type: DataTypes.STRING(255), allowNull: false },
            pickup_longitude: { type: DataTypes.STRING(255), allowNull: false },

            dropoff_latitude:  { type: DataTypes.STRING(255), allowNull: false },
            dropoff_longitude: { type: DataTypes.STRING(255), allowNull: false },

            status: {

                type:         DataTypes.ENUM('REQUESTED', 'ASSIGNED', 'IN_TRANSIT', 'COMPLETED', 'CANCELED'),
                allowNull:    false,
                defaultValue: 'REQUESTED'
            },
        },

        { sequelize, tableName: 'rides', timestamps: false, underscored: true, modelName: 'Ride' });
    }
}

export default Ride;
