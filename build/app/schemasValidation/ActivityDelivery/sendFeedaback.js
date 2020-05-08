'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var Yup = _interopRequireWildcard(_yup);

var _ActivityDelivery = require('../../models/ActivityDelivery');

var _ActivityDelivery2 = _interopRequireDefault(_ActivityDelivery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schema = Yup.object().shape({
  feedback: Yup.string('Dado inválido').required('Campo obrigatório').min(5, 'Campo deve ter entre 5 e 200 caracteres').max(200, 'Campo deve ter entre 5 e 200 caracteres'),
  id_delivery_activity: Yup.number('Dado inválido').positive('Dado inválido').required('Campo obrigatório').test('classExists', 'Resposta de Atividade não existe', async function (value) {
    if (value) {
      var activityDelivery = await _ActivityDelivery2.default.findOne({
        where: { id: value },
        attributes: ['id']
      });
      return activityDelivery !== null;
    }
    return true;
  })
});

exports.default = schema;
//# sourceMappingURL=sendFeedaback.js.map