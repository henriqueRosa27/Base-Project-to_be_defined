module.exports = (sequelize, DataTypes) => {
  const Usuario_Turma = sequelize.define(
    'Usuario_Turma',
    {
      data_ingresso: DataTypes.DATE,
    },
    {}
  );
  return Usuario_Turma;
};
