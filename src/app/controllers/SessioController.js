import jwt from 'jsonwebtoken';

import User from '../models/User';
import validate from '../common/validate';
import loginSchema from '../schemasValidation/login';
import authConfig from '../../config/auth';

class UserController {
  async login(req, res) {
    const result = await validate(loginSchema, req.body);

    if (!result.success) return res.status(401).json(result.object).send();

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Senha incorreta' });
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
