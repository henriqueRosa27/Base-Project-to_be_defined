module.exports = (sequelize, DataTypes) => {
  const Atividade = sequelize.define(
    'Atividade',
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      data_criacao: DataTypes.DATE,
      data_entrega: DataTypes.DATE,
    },
    {}
  );
  return Atividade;
};
