import { Model, DataTypes } from "sequelize";

class RideUpdates extends Model {

    static init(sequelize) {

        return super.init({

            id:      { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
            ride_id: { type: DataTypes.BIGINT, allowNull:  true },

            status:           {
                type:         DataTypes.ENUM('REQUESTED', 'ASSIGNED', 'IN_TRANSIT', 'COMPLETED', 'CANCELED'),
                allowNull:    false,
                defaultValue: 'REQUESTED'
            },
        },
        {

            sequelize,
            tableName:   'rides_updates',
            timestamps:  false,
            underscored: true
        })
    }
}

export default RideUpdates
