'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

var _Class = require('../../models/Class');

var _Class2 = _interopRequireDefault(_Class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  name: Yup.string('Dado inválido').required('Campo obrigatório').min(5, 'Campo deve ter entre 5 e 50 caracteres').max(50, 'Campo deve ter entre 5 e 50 caracteres'),
  description: Yup.string('Dado inválido').required('Campo obrigatório').min(5, 'Campo deve ter entre 5 e 500 caracteres').max(500, 'Campo deve ter entre 5 e 500 caracteres'),
  deadline: Yup.date('Dado inválido'),
  id_class: Yup.number('Dado inválido').positive('Dado inválido').required('Campo obrigatório').test('classExists', 'Turma não existe', async function (value) {
    if (value) {
      var clas = await _Class2.default.findOne({
        where: { id: value },
        attributes: ['id']
      });
      return clas !== null;
    }
    return true;
  })
});

exports.default = schema;
//# sourceMappingURL=create.js.map