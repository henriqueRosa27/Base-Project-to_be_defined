'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  name: Yup.string('Dado inválido').required('Campo obrigatório'),
  surname: Yup.string('Dado invaálido').required('Campo obrigatório'),
  email: Yup.string('Dado inválido').required('Campo obrigatório').email('Email inválido').test('unique', 'Email já cadastrado', async function (value) {
    if (value) {
      var user = await _User2.default.findOne({
        where: { email: value },
        attributes: ['id']
      });
      return user === null;
    }
    return true;
  }),
  password: Yup.string('Dado inválido').required('Campo obrigatório').min(6, 'Campo deve ter entre 6 e 16 caracteres').max(16, 'Campo deve ter entre 6 e 16 caracteres'),
  confirmPassword: Yup.string('Dado inválido').required('Campo obrigatório').min(6, 'Campo deve ter entre 6 e 16 caracteres').max(16, 'Campo deve ter entre 6 e 16 caracteres').oneOf([Yup.ref('password'), null], 'Senha diferentes')
});

exports.default = schema;
//# sourceMappingURL=user.js.map