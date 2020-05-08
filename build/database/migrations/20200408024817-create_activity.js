'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Activity', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      creation_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: true
      },
      id_class: {
        type: Sequelize.INTEGER,
        references: { model: 'Class', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: function down(queryInterface) {
    return queryInterface.dropTable('Activity');
  }
};
//# sourceMappingURL=20200408024817-create_activity.js.map