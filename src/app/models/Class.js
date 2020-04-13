import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        topic: Sequelize.STRING,
        code: Sequelize.STRING,
        creation_date: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'teacher', foreignKey: 'id_teacher' });
    this.belongsToMany(models.User, {
      through: 'Student_Class',
      as: 'students',
      foreignKey: 'id_class',
      otherKey: 'id_user',
    });
  }
}

export default Class;
