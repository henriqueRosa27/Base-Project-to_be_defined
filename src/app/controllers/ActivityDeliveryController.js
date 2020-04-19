import ActivityDelivery from '../models/ActivityDelivery';
import validate from '../common/validate';
import schemaCreate from '../schemasValidation/ActivityDelivery/create';
import schemaSendFeedaback from '../schemasValidation/ActivityDelivery/sendFeedaback';

class UserController {
  async getAll(req, res) {
    const activities = await ActivityDelivery.findAll({
      attributes: [
        'id',
        'note',
        'delivery_date',
        'report',
        'image',
        'feedback',
      ],
    });
    return res.json(activities);
  }

  async getById(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const activityDelivery = await ActivityDelivery.findOne({
      attributes: [
        'id',
        'note',
        'delivery_date',
        'report',
        'image',
        'feedback',
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!activityDelivery)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    return res.json(activityDelivery);
  }

  async create(req, res) {
    const result = await validate(schemaCreate, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { object } = result;
    object.delivery_date = Date.now();
    object.image = req.file.path;
    object.id_user = req.userId;
    object.feedback = null;

    const {
      id,
      note,
      delivery_date,
      report,
      image,
    } = await ActivityDelivery.create(object);

    return res.json({ id, note, delivery_date, report, image });
  }

  async sendFeedback(req, res) {
    const result = await validate(schemaSendFeedaback, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { object } = result;
    const { feedback, id_delivery_activity } = object;

    const activityDelivery = await ActivityDelivery.findOne({
      attributes: [
        'id',
        'note',
        'delivery_date',
        'report',
        'image',
        'feedback',
      ],
      where: {
        id: id_delivery_activity,
      },
    });

    const {
      id,
      note,
      delivery_date,
      report,
      image,
    } = await activityDelivery.update({feedback});

    return res.json({ id, note, delivery_date, report, image });
  }
}

export default new UserController();
