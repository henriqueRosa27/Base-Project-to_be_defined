'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Activity = require('../models/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _validate = require('../common/validate');

var _validate2 = _interopRequireDefault(_validate);

var _create = require('../schemasValidation/Activity/create');

var _create2 = _interopRequireDefault(_create);

var _update = require('../schemasValidation/Activity/update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'getAll',
    value: async function getAll(req, res) {
      var activities = await _Activity2.default.findAll({
        attributes: ['id', 'name', 'description', 'deadline']
      });
      return res.json(activities);
    }
  }, {
    key: 'getById',
    value: async function getById(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var activity = await _Activity2.default.findOne({
        attributes: ['id', 'name', 'description', 'deadline'],
        where: {
          id: req.params.id
        }
      });

      if (!activity) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      return res.json(activity);
    }
  }, {
    key: 'create',
    value: async function create(req, res) {
      var result = await (0, _validate2.default)(_create2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;

      object.creation_date = Date.now();

      var _ref = await _Activity2.default.create(object),
          id = _ref.id,
          name = _ref.name,
          description = _ref.description,
          id_class = _ref.id_class,
          deadline = _ref.deadline;

      return res.json({
        id: id,
        name: name,
        description: description,
        id_class: id_class,
        deadline: deadline
      });
    }
  }, {
    key: 'update',
    value: async function update(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var result = await (0, _validate2.default)(_update2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;

      object.creation_date = Date.now();

      var activity = await _Activity2.default.findOne({
        attributes: ['id', 'name', 'description'],
        where: {
          id: req.params.id
        }
      });

      if (!activity) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      activity.name = object.name;
      activity.description = object.description;
      activity.deadline = object.deadline;

      var _ref2 = await activity.update(object),
          id = _ref2.id,
          name = _ref2.name,
          description = _ref2.description,
          id_class = _ref2.id_class,
          deadline = _ref2.deadline;

      return res.json({
        id: id,
        name: name,
        description: description,
        id_class: id_class,
        deadline: deadline
      });
    }
  }, {
    key: 'delete',
    value: async function _delete(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var activity = await _Activity2.default.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id']
      });

      if (!activity) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      await _Activity2.default.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json();
    }
  }]);

  return UserController;
}();

exports.default = new UserController();
//# sourceMappingURL=ActivityController.js.map