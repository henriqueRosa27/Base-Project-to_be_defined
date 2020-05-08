'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Class = require('../models/Class');

var _Class2 = _interopRequireDefault(_Class);

var _StudentClass = require('../models/StudentClass');

var _StudentClass2 = _interopRequireDefault(_StudentClass);

var _validate = require('../common/validate');

var _validate2 = _interopRequireDefault(_validate);

var _linkByEmail = require('../schemasValidation/StudentClass/linkByEmail');

var _linkByEmail2 = _interopRequireDefault(_linkByEmail);

var _linkByCode = require('../schemasValidation/StudentClass/linkByCode');

var _linkByCode2 = _interopRequireDefault(_linkByCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StudentClassContoller = function () {
  function StudentClassContoller() {
    _classCallCheck(this, StudentClassContoller);
  }

  _createClass(StudentClassContoller, [{
    key: 'linkByEmail',
    value: async function linkByEmail(req, res) {
      var result = await (0, _validate2.default)(_linkByEmail2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;


      var clas = await _Class2.default.findOne({
        where: {
          id: object.id_class
        },
        include: [{
          model: _User2.default,
          as: 'students'
        }]
      });
      if (!clas) return res.status(404).json({ errors: { errors: ['Turma não encontrada'] } });

      var user = await _User2.default.findOne({
        where: {
          email: object.email
        }
      });
      if (!user) return res.status(404).json({ errors: { errors: ['Usuário não encontrado'] } });

      if (clas.students.some(function (student) {
        return student.id === user.id;
      }) || clas.id_teacher === user.id) return res.status(404).json({
        errors: { errors: ['Usuário já vinculado a turma informada'] }
      });

      var link = {
        id_class: clas.id,
        id_user: user.id,
        entry_date: Date.now()
      };

      var _ref = await _StudentClass2.default.create(link),
          id = _ref.id,
          entry_date = _ref.entry_date;

      return res.json({
        id: id,
        entry_date: entry_date
      });
    }
  }, {
    key: 'linkByCode',
    value: async function linkByCode(req, res) {
      var result = await (0, _validate2.default)(_linkByCode2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;
      var userId = req.userId;


      var clas = await _Class2.default.findOne({
        where: {
          code: object.code
        },
        include: [{
          model: _User2.default,
          as: 'students'
        }]
      });
      if (!clas) return res.status(404).json({ errors: { errors: ['Turma não encontrado'] } });

      if (clas.students.some(function (student) {
        return student.id === userId;
      }) || clas.id_teacher === userId) return res.status(404).json({
        errors: { errors: ['Usuário já vinculado a turma informada'] }
      });

      var link = {
        id_class: clas.id,
        id_user: userId,
        entry_date: Date.now()
      };

      var _ref2 = await _StudentClass2.default.create(link),
          id = _ref2.id,
          entry_date = _ref2.entry_date;

      return res.json({
        id: id,
        entry_date: entry_date
      });
    }
  }]);

  return StudentClassContoller;
}();

exports.default = new StudentClassContoller();
//# sourceMappingURL=StudentClassContoller.js.map