module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    message: {
      type: Sequelize.STRING
    },
    senderId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Contacts',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    receiverId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Contacts',
        key: 'id'
      },
      onDelete: 'SET NULL',
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Messages')
};
