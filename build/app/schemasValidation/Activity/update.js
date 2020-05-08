'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  name: Yup.string('Dado inválido').required('Campo obrigatório').min(5, 'Campo deve ter entre 5 e 50 caracteres').max(50, 'Campo deve ter entre 5 e 50 caracteres'),
  description: Yup.string('Dado inválido').required('Campo obrigatório').min(5, 'Campo deve ter entre 5 e 500 caracteres').max(500, 'Campo deve ter entre 5 e 500 caracteres'),
  deadline: Yup.date('Dado inválido')
});

exports.default = schema;
//# sourceMappingURL=update.js.map