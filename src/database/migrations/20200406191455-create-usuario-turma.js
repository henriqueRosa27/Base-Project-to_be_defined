module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario_Turma', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_ingresso: {
        type: Sequelize.DATE,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('Usuario_Turma');
  },
};
