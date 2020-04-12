module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Class', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      topic: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      creation_date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Class');
  },
};