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
  }

  static associate(models) {
    this.belongsTo(models.Class, { as: 'Class', foreignKey: 'id_class' });
    this.hasMany(models.Activity_Delivery, { as: 'Activities_Delivered' });
  }
}

export default Activity;
