export default {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('rides', {

            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

            rider_id:  { type: Sequelize.INTEGER, allowNull: false },
            driver_id: { type: Sequelize.INTEGER, allowNull: true, defaultValue: null },

            pickup_latitude:  { type: Sequelize.STRING(255), allowNull: false },
            pickup_longitude: { type: Sequelize.STRING(255), allowNull: false },

            dropoff_latitude:  { type: Sequelize.STRING(255), allowNull: false },
            dropoff_longitude: { type: Sequelize.STRING(255), allowNull: false },

            status: {

                type:         Sequelize.ENUM('REQUESTED', 'ASSIGNED', 'IN_TRANSIT', 'COMPLETED', 'CANCELED'),
                defaultValue: 'REQUESTED'
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('rides');
    }
};
