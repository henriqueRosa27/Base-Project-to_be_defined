import User from '../models/User';
import validate from '../common/validate';
import schema from '../schemas/user';

class UserController {
  async getAll(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'name', 'surname', 'email'],
    });

    return res.json(user);
  }

  async getById(req, res) {
    if (!req.params.id) return res.json(null);

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'surname', 'email'],
    });

    return res.json(user);
  }

  async create(req, res) {
    const errors = await validate(schema, req.body);

    if (errors) {
      return res.status(400).json(errors).send();
    }

    const { id, name, surname, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      surname,
      email,
    });
  }
}

export default new UserController();
