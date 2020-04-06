module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Atividade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      data_criacao: {
        type: Sequelize.DATE,
      },
      data_entrega: {
        type: Sequelize.DATE,
      },
      id_turma: {
        type: Sequelize.INTEGER,
        references: { model: 'turma', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('Atividade');
  },
};
