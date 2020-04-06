module.exports = (sequelize, DataTypes) => {
  const Entrega_Atividade = sequelize.define(
    'Entrega_Atividade',
    {
      observacao: DataTypes.STRING,
      data_entrega: DataTypes.DATE,
      informacao: DataTypes.STRING,
      feedback: DataTypes.STRING,
      imagem: DataTypes.STRING,
    },
    {}
  );
  return Entrega_Atividade;
};
