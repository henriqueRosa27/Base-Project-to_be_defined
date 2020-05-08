'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  name: Yup.string('Dado inválido').required('Campo obrigatório').min(4, 'Campo deve ter entre 4 e 30 caracteres').max(30, 'Campo deve ter entre 4 e 30 caracteres'),
  topic: Yup.string('Dado inválido').required('Campo obrigatório').min(4, 'Campo deve ter entre 4 e 150 caracteres').max(150, 'Campo deve ter entre 4 e 150 caracteres')
});

exports.default = schema;
//# sourceMappingURL=class.js.map