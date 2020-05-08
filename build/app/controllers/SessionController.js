'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _validate = require('../common/validate');

var _validate2 = _interopRequireDefault(_validate);

var _errorMessage = require('../common/errorMessage');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

var _login = require('../schemasValidation/login');

var _login2 = _interopRequireDefault(_login);

var _auth = require('../../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'login',
    value: async function login(req, res) {
      var result = await (0, _validate2.default)(_login2.default, req.body);

      if (!result.success) return res.status(400).json(result.object).send();

      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      var user = await _User2.default.findOne({ where: { email: email } });

      if (!user) {
        return res.status(400).json({
          errors: (0, _errorMessage2.default)('email', 'unique', 'Usuário não encontrado')
        });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(400).json({
          errors: (0, _errorMessage2.default)('password', 'verification', 'Senha incorreta')
        });
      }
      // aqui pego o id e nome do usuario, o email ja tenho anteriormente
      var id = user.id,
          name = user.name;


      return res.json({
        token: _jsonwebtoken2.default.sign({ user: { id: id, name: name, email: email } }, _auth2.default.secret, {
          expiresIn: _auth2.default.expiresIn
        })
      });
    }
  }]);

  return UserController;
}();

exports.default = new UserController();
//# sourceMappingURL=SessionController.js.map