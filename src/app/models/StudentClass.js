import Sequelize, { Model } from 'sequelize';

class StudentClass extends Model {
  static init(sequelize) {
    super.init(
      {
        entry_date: Sequelize.DATE,
      },
      { sequelize, modelName: 'Student_Class' }
    );
    return this;
  }


  static associate(models) {
    this.belongsTo(models.User, { as: 'Student', foreignKey: 'id_user' });
    this.belongsTo(models.Class, { as: 'Class', foreignKey: 'id_class' });
  }
}

export default StudentClass;
