import Sequelize, { Model } from 'sequelize';

class Student_Class extends Model {
  static init(sequelize) {
    super.init(
      {
        entry_date: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'Student', foreignKey: 'id_user' });
    this.belongsTo(models.Class, { as: 'Class', foreignKey: 'id_class' });
  }
}

export default Student_Class;
