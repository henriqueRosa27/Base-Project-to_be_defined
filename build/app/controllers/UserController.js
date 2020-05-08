'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _validate = require('../common/validate');

var _validate2 = _interopRequireDefault(_validate);

var _user = require('../schemasValidation/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'getAll',
    value: async function getAll(req, res) {
      var user = await _User2.default.findAll({
        attributes: ['id', 'name', 'surname', 'email']
      });

      return res.json(user);
    }
  }, {
    key: 'getById',
    value: async function getById(req, res) {
      if (!req.params.id || !Number.isInteger(req.params.id)) return res.status(400).json({ errors: { errors: ['Paramêtro informado inválido'] } });

      var user = await _User2.default.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'name', 'surname', 'email']
      });

      if (!user) return res.status(404).json({ errors: { errors: ['Nenhum registro encontrado'] } });

      return res.json(user);
    }
  }, {
    key: 'create',
    value: async function create(req, res) {
      var result = await (0, _validate2.default)(_user2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var object = result.object;

      if (object.confirmPassword) delete object.confirmPassword;

      var _ref = await _User2.default.create(object),
          id = _ref.id,
          name = _ref.name,
          surname = _ref.surname,
          email = _ref.email;

      return res.json({
        id: id,
        name: name,
        surname: surname,
        email: email
      });
    }
  }]);

  return UserController;
}();

exports.default = new UserController();
//# sourceMappingURL=UserController.js.map