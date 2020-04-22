import Sequelize, { Model } from 'sequelize';

class Activity extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        creation_date: Sequelize.DATE,
        deadline: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Class, { as: 'Class', foreignKey: 'id_class' });
  }
}

export default Activity;
