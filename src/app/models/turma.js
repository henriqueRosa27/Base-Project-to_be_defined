module.exports = (sequelize, DataTypes) => {
  const Turma = sequelize.define(
    'Turma',
    {
      nome: DataTypes.STRING,
      assunto: DataTypes.STRING,
      codigo: DataTypes.STRING,
      data_criacao: DataTypes.DATE,
    },
    {}
  );
  return Turma;
};
