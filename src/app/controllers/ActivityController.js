import Activity from '../models/Activity';

class UserController {
  async getAll(req, res) {
    const activities = await Activity.findAll();
    return res.json(activities);
  }

  async getById(req, res) {
    if (!req.params.id)
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const user = await Activity.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    return res.json(user);
  }
}

export default new UserController();
