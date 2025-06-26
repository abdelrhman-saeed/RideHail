import { QueryInterface, Sequelize } from 'sequelize'


export default {

    async up(QueryInterface, Sequelize) {

        await QueryInterface.createTable('rides_updates', {

            id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            ride_id:   { type: Sequelize.INTEGER },
            status:    { type: Sequelize.ENUM('REQUESTED', 'ASSIGNED', 'IN_TRANSIT', 'COMPLETED', 'CANCELED') },
            timestamp: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        })
    },

    async down(QueryInterface) {
        await QueryInterface.dropTable('rides_updates')
    }
}
