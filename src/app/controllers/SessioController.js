import jwt from 'jsonwebtoken';

import User from '../models/User';
import validate from '../common/validate';
import loginSchema from '../schemas/login';
import authConfig from '../../config/auth';

class UserController {
  async login(req, res) {
    const result = await validate(loginSchema, req.body);

    if (!result.success) return res.status(401).json(result.object).send();

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }
    // aqui pego o id e nome do usuario, o email ja tenho anteriormente
    const { id, name } = user;

    return res.json({
      token: jwt.sign({ user: {id, name, email} }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new UserController();
