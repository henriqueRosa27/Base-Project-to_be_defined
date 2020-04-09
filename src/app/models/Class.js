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
      trough: 'Student_Class',
      as: 'Students',
    });
    this.hasMany(models.Activity, { as: 'Activities' });
  }
}

export default Class;
