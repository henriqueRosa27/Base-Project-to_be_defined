import Activity from '../models/Activity';
import validate from '../common/validate';
import schemaCreate from '../schemasValidation/Activity/create';
import schemaUpdate from '../schemasValidation/Activity/update';

class UserController {
  async getAll(req, res) {
    const activities = await Activity.findAll({
      attributes: ['id', 'name', 'description', 'deadline'],
    });
    return res.json(activities);
  }

  async getById(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const activity = await Activity.findOne({
      attributes: ['id', 'name', 'description', 'deadline'],
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

    const { id, name, description, id_class, deadline } = await Activity.create(
      object
    );

    return res.json({
      id,
      name,
      description,
      id_class,
      deadline,
    });
  }

  async update(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const result = await validate(schemaUpdate, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { object } = result;
    object.creation_date = Date.now();

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

    activity.name = object.name;
    activity.description = object.description;
    activity.deadline = object.deadline;

    const { id, name, description, id_class, deadline } = await activity.update(
      object
    );

    return res.json({
      id,
      name,
      description,
      id_class,
      deadline,
    });
  }

  async delete(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const activity = await Activity.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id']
    });

    if (!activity)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    await Activity.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new UserController();
