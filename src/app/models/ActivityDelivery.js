import Sequelize, { Model } from 'sequelize';

class ActivityDelivery extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        delivery_date: Sequelize.DATE,
        report: Sequelize.STRING,
        image: Sequelize.STRING,
        feedback: Sequelize.STRING,
      },
      { sequelize, modelName: 'Activity_Delivery' }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    this.hasMany(models.Activity, {
      foreignKey: 'id_activity',
      as: 'activity',
    });
  }
}

export default ActivityDelivery;
