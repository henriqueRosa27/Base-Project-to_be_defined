import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        surame: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      { sequelize }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User);
    this.belongsToMany(models.User, { through: 'Student_Class' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default Class;
