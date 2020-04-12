import jwt from 'jsonwebtoken';

import User from '../models/User';
import validate from '../common/validate';
import loginSchema from '../schemas/login';
import authConfig from '../../config/auth';

class UserController {
  async login(req, res) {
    const result = await validate(loginSchema, req.body);

    if (!result.success) return res.status(400).json(result.object).send();

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
      // aqui retorno o id, nome e email, além do token
      user: {
        id,
        name,
        email,
      },
      // aqui retorno o token
      // no sign passamos 3 parametros
      // o primeiro parametro é o que vai estar no payload, neste caso o id do usuario
      // assim tenho acesso ao id do usuario quando usar o token
      // no segundo parametro eu passo uma frase bem aleatoria, uma string que seja segura
      // gobarberrocketseat123 - gerou o hash
      // o terceiro parametro é o tempo de expiracao, neste caso ficou 7 dias
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new UserController();
