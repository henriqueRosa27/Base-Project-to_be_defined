import Activity from '../models/Activity';
import validate from '../common/validate';
import schemaCreate from '../schemasValidation/Activity/create';

class UserController {
  async getAll(req, res) {
    const activities = await Activity.findAll({
      attributes: ['id', 'name', 'description'],
    });
    return res.json(activities);
  }

  async getById(req, res) {
    if (!req.params.id)
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const activity = await Activity.findOne({
      attributes: ['id', 'name', 'description'],
      where: {
        id: req.params.id,
      },
    });

    if (!activity)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    return res.json(activity);
  }

  async create(req, res) {
    const result = await validate(schemaCreate, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { object } = result;
    object.creation_date = Date.now();

    /* const { id, name, topic, code, creation_date } = await Activity.create(
      object
    );

    /return res.json({
      id,
      name,
      topic,
      code,
      creation_date,
    }); */

    return res.json({
      object,
    });
  }
}

export default new UserController();
