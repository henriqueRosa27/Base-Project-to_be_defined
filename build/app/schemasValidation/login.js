'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  email: Yup.string('Dado inválido').email('Email invalido').required('Campo obrigatório'),
  password: Yup.string('Dado inválido').required('Campo obrigatório').min(6, 'Campo deve ter entre 6 e 16 caracteres').max(16, 'Campo deve ter entre 6 e 16 caracteres')
});

exports.default = schema;
//# sourceMappingURL=login.js.map