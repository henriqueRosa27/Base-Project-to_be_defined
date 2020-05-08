'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _sequelize = require('sequelize');

var _Class = require('../models/Class');

var _Class2 = _interopRequireDefault(_Class);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _validate = require('../common/validate');

var _validate2 = _interopRequireDefault(_validate);

var _class = require('../schemasValidation/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassController = function () {
  function ClassController() {
    _classCallCheck(this, ClassController);
  }

  _createClass(ClassController, [{
    key: 'getAll',
    value: async function getAll(req, res) {
      var clas = await _Class2.default.findAll({
        attributes: ['id', 'name', 'topic', 'code', 'creation_date'],
        where: _defineProperty({}, _sequelize.Op.or, [{ '$students.id$': req.userId }, { '$teacher.id$': req.userId }]),
        include: [{
          model: _User2.default,
          as: 'teacher',
          attributes: ['id', 'name', 'surname']
        }, {
          model: _User2.default,
          as: 'students'
        }]
      });
      return res.json(clas);
    }
  }, {
    key: 'getById',
    value: async function getById(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var clas = await _Class2.default.findOne({
        where: _defineProperty({
          id: req.params.id
        }, _sequelize.Op.or, [{ '$students.id$': req.userId }, { '$teacher.id$': req.userId }]),
        attributes: ['id', 'name', 'topic', 'code', 'creation_date'],
        include: [{
          model: _User2.default,
          as: 'students'
        }, {
          model: _User2.default,
          as: 'teacher'
        }]
      });

      if (!clas) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      return res.json(clas);
    }
  }, {
    key: 'getByCode',
    value: async function getByCode(req, res) {
      if (!req.params.code) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var clas = await _Class2.default.findOne({
        where: {
          code: req.params.code
        },
        attributes: ['id', 'name', 'topic', 'code', 'creation_date'],
        include: [{
          model: _User2.default,
          as: 'students'
        }, {
          model: _User2.default,
          as: 'teacher'
        }]
      });

      if (!clas) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      return res.json(clas);
    }
  }, {
    key: 'create',
    value: async function create(req, res) {
      var result = await (0, _validate2.default)(_class2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;

      object.code = _uniqid2.default.time();
      object.id_teacher = req.userId;
      object.creation_date = Date.now();

      var _ref = await _Class2.default.create(object),
          id = _ref.id,
          name = _ref.name,
          topic = _ref.topic,
          code = _ref.code,
          creation_date = _ref.creation_date;

      return res.json({
        id: id,
        name: name,
        topic: topic,
        code: code,
        creation_date: creation_date
      });
    }
  }, {
    key: 'update',
    value: async function update(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var result = await (0, _validate2.default)(_class2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;


      var clas = await _Class2.default.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!clas) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      var _ref2 = await clas.update(object),
          id = _ref2.id,
          name = _ref2.name,
          topic = _ref2.topic,
          code = _ref2.code,
          creation_date = _ref2.creation_date;

      return res.json({
        id: id,
        name: name,
        topic: topic,
        code: code,
        creation_date: creation_date
      });
    }
  }, {
    key: 'delete',
    value: async function _delete(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var clas = await _Class2.default.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!clas) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      await _Class2.default.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json();
    }
  }]);

  return ClassController;
}();

exports.default = new ClassController();
//# sourceMappingURL=ClassController.js.map