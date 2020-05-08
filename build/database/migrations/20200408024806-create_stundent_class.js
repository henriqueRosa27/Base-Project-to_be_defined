'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Student_Class', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      entry_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
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
    return queryInterface.dropTable('Student_Class');
  }
};
//# sourceMappingURL=20200408024806-create_stundent_class.js.map