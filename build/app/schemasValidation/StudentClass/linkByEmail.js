'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  email: Yup.string('Dado inválido').email('Email invalido').required('Campo obrigatório'),
  id_class: Yup.number('Dado inválido').required('Campo obrigatório')
});

exports.default = schema;
//# sourceMappingURL=linkByEmail.js.map