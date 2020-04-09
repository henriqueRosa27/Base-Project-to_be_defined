import Sequelize, { Model } from 'sequelize';

class Activity_Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        delivery_date: Sequelize.DATE,
        report: Sequelize.STRING,
        image: Sequelize.STRING,
        feedback: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    this.hasMany(models.Activity, {
      foreignKey: 'id_activity',
      as: 'activity',
    });
  }
}

export default Activity_Delivery;
