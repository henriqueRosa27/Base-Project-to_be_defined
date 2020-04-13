import User from '../models/User';
import Class from '../models/Class';
import StudentClass from '../models/StudentClass';
import validate from '../common/validate';
import schemaEmail from '../schemas/StudentClass/linkByEmail';
import schemaCode from '../schemas/StudentClass/linkByCode';

class StudentClassContoller {
  async linkByEmail(req, res) {
    const result = await validate(schemaEmail, req.body);

    if (!result.success) return res.status(401).json(result.object).send();

    const { object } = result;

    const clas = await Class.findOne({
      where: {
        id: object.id_class,
      },
      include: [
        {
          model: User,
          as: 'students',
        },
      ],
    });
    if (!clas) return res.json(null);

    const user = await User.findOne({
      where: {
        email: object.email,
      },
    });
    if (!user) return res.json(null);

    if (
      clas.students.some((student) => student.id === user.id) ||
      clas.id_teacher === user.id
    )
      return res.json(null);

    const link = {
      id_class: clas.id,
      id_user: user.id,
      entry_date: Date.now(),
    };

    const { id, entry_date } = await StudentClass.create(link);

    return res.json({
      id,
      entry_date,
    });
  }

  async linkByCode(req, res) {
    const result = await validate(schemaCode, req.body);

    if (!result.success) return res.status(401).json(result.object).send();

    const { object } = result;
    const { userId } = req;

    const clas = await Class.findOne({
      where: {
        code: object.code,
      },
      include: [
        {
          model: User,
          as: 'students',
        },
      ],
    });
    if (!clas) return res.json(null);

    if (
      clas.students.some((student) => student.id === userId) ||
      clas.id_teacher === userId
    )
      return res.json(null);

    const link = {
      id_class: clas.id,
      id_user: userId,
      entry_date: Date.now(),
    };

    const { id, entry_date } = await StudentClass.create(link);

    return res.json({
      id,
      entry_date,
    });
  }
}

export default new StudentClassContoller();
