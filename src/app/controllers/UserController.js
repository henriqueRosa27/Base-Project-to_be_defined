import User from '../models/User';
import validate from '../common/validate';
import schema from '../schemasValidation/user';

class UserController {
  async getAll(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'name', 'surname', 'email'],
    });

    return res.json(user);
  }

  async getById(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'surname', 'email'],
    });

    if (!user)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    return res.json(user);
  }

  async create(req, res) {
    const result = await validate(schema, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { id, name, surname, email } = await User.create(result.object);

    return res.json({
      id,
      name,
      surname,
      email,
    });
  }
}

export default new UserController();
