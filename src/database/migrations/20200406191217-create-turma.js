module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Turma', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
      },
      assunto: {
        type: Sequelize.STRING,
      },
      codigo: {
        type: Sequelize.STRING,
      },
      data_criacao: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Turmas');
  },
};
