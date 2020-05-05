import uniqid from 'uniqid';
import { Op } from 'sequelize';

import Class from '../models/Class';
import User from '../models/User';
import validate from '../common/validate';
import schema from '../schemasValidation/class';

class ClassController {
  async getAll(req, res) {
    const clas = await Class.findAll({
      attributes: ['id', 'name', 'topic', 'code', 'creation_date'],
      where: {
        [Op.or]: [
          { '$students.id$': req.userId },
          { '$teacher.id$': req.userId },
        ],
      },
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'name', 'surname'],
        },
        {
          model: User,
          as: 'students',
        },
      ],
    });
    return res.json(clas);
  }

  async getById(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const clas = await Class.findOne({
      where: {
        id: req.params.id,
        [Op.or]: [
          { '$students.id$': req.userId },
          { '$teacher.id$': req.userId },
        ],
      },
      attributes: ['id', 'name', 'topic', 'code', 'creation_date'],
      include: [
        {
          model: User,
          as: 'students',
        },
        {
          model: User,
          as: 'teacher',
        },
      ],
    });

    if (!clas)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    return res.json(clas);
  }

  async getByCode(req, res) {
    if (!req.params.code)
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const clas = await Class.findOne({
      where: {
        code: req.params.code,
      },
      attributes: ['id', 'name', 'topic', 'code', 'creation_date'],
      include: [
        {
          model: User,
          as: 'students',
        },
        {
          model: User,
          as: 'teacher',
        },
      ],
    });

    if (!clas)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    return res.json(clas);
  }

  async create(req, res) {
    const result = await validate(schema, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { object } = result;
    object.code = uniqid.time();
    object.id_teacher = req.userId;
    object.creation_date = Date.now();

    const { id, name, topic, code, creation_date } = await Class.create(object);

    return res.json({
      id,
      name,
      topic,
      code,
      creation_date,
    });
  }

  async update(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const result = await validate(schema, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

    const { object } = result;

    const clas = await Class.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!clas)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    const { id, name, topic, code, creation_date } = await clas.update(object);

    return res.json({
      id,
      name,
      topic,
      code,
      creation_date,
    });
  }

  async delete(req, res) {
    if (!req.params.id || !Number.isInteger(req.params.id))
      return res
        .status(400)
        .json({ errors: { errors: ['Paramêtro informado inválido'] } });

    const clas = await Class.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!clas)
      return res
        .status(404)
        .json({ errors: { errors: ['Nenhum registro encontrado'] } });

    await Class.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new ClassController();
