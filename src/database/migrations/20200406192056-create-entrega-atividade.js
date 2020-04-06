module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Entrega_Atividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      observacao: {
        type: Sequelize.STRING,
      },
      data_entrega: {
        type: Sequelize.DATE,
      },
      informacao: {
        type: Sequelize.STRING,
      },
      feedback: {
        type: Sequelize.STRING,
      },
      imagem: {
        type: Sequelize.STRING,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      id_atividade: {
        type: Sequelize.INTEGER,
        references: { model: 'atividade', key: 'id' },
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
    return queryInterface.dropTable('Entrega_Atividades');
  },
};
