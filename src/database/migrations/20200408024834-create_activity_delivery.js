module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activity_Delivery', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      note: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      report: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      feedback: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      id_activity: {
        type: Sequelize.INTEGER,
        references: { model: 'Activity', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Activity_Delivery');
  },
};
