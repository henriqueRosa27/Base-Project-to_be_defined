'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActivityDelivery = require('../models/ActivityDelivery');

var _ActivityDelivery2 = _interopRequireDefault(_ActivityDelivery);

var _validate = require('../common/validate');

var _validate2 = _interopRequireDefault(_validate);

var _create = require('../schemasValidation/ActivityDelivery/create');

var _create2 = _interopRequireDefault(_create);

var _sendFeedaback = require('../schemasValidation/ActivityDelivery/sendFeedaback');

var _sendFeedaback2 = _interopRequireDefault(_sendFeedaback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'getAll',
    value: async function getAll(req, res) {
      var activities = await _ActivityDelivery2.default.findAll({
        attributes: ['id', 'note', 'delivery_date', 'report', 'image', 'feedback']
      });
      return res.json(activities);
    }
  }, {
    key: 'getById',
    value: async function getById(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var activityDelivery = await _ActivityDelivery2.default.findOne({
        attributes: ['id', 'note', 'delivery_date', 'report', 'image', 'feedback'],
        where: {
          id: req.params.id
        }
      });

      if (!activityDelivery) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      return res.json(activityDelivery);
    }
  }, {
    key: 'create',
    value: async function create(req, res) {
      var result = await (0, _validate2.default)(_create2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;

      object.delivery_date = Date.now();
      object.image = req.file.path;
      object.id_user = req.userId;
      object.feedback = null;

      var _ref = await _ActivityDelivery2.default.create(object),
          id = _ref.id,
          note = _ref.note,
          delivery_date = _ref.delivery_date,
          report = _ref.report,
          image = _ref.image;

      return res.json({ id: id, note: note, delivery_date: delivery_date, report: report, image: image });
    }
  }, {
    key: 'sendFeedback',
    value: async function sendFeedback(req, res) {
      var result = await (0, _validate2.default)(_sendFeedaback2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;
      var feedback = object.feedback,
          id_delivery_activity = object.id_delivery_activity;


      var activityDelivery = await _ActivityDelivery2.default.findOne({
        attributes: ['id', 'note', 'delivery_date', 'report', 'image', 'feedback'],
        where: {
          id: id_delivery_activity
        }
      });

      var _ref2 = await activityDelivery.update({ feedback: feedback }),
          id = _ref2.id,
          note = _ref2.note,
          delivery_date = _ref2.delivery_date,
          report = _ref2.report,
          image = _ref2.image;

      return res.json({ id: id, note: note, delivery_date: delivery_date, report: report, image: image });
    }
  }]);

  return UserController;
}();

exports.default = new UserController();
//# sourceMappingURL=ActivityDeliveryController.js.map