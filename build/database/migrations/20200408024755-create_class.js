'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Class', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      topic: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      creation_date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Class');
  }
};
//# sourceMappingURL=20200408024755-create_class.js.map