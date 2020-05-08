'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// importo o model user da minha aplicacao

// importo as configuracoes de conexao com o banco


var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User');

var _User2 = _interopRequireDefault(_User);

var _Class = require('../app/models/Class');

var _Class2 = _interopRequireDefault(_Class);

var _StudentClass = require('../app/models/StudentClass');

var _StudentClass2 = _interopRequireDefault(_StudentClass);

var _Activity = require('../app/models/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _ActivityDelivery = require('../app/models/ActivityDelivery');

var _ActivityDelivery2 = _interopRequireDefault(_ActivityDelivery);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// aqui vai ser um array contendo todos os models da minha aplicacao
var models = [_User2.default, _Class2.default, _StudentClass2.default, _Activity2.default, _ActivityDelivery2.default];

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);

    // aqui no construtor, chamo o metodo init para ser executado quando rodar a aplicacao
    this.init();
  }

  _createClass(Database, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // aqui estou pegando os dados de conexao do config/database e passando junto ao sequelize
      // isto vai ficar armazenado na variavel connection
      this.connection = new _sequelize2.default(_database2.default);
      // agora aqui eu pego e percorro o array com todos os modelos da minha aplicacao
      // e chamo o metodo contido em cada model (init)
      // passo o parametro solicitado pelo init (sequelize) , que é os dados de conexao
      models.map(function (model) {
        return model.init(_this.connection);
      })
      // aqui vou fazer um segundo map
      // percorro os models e chamo para cada um o associate
      // vou chamar o associate somente se ele existir no model
      // a segunda parte vai executar somente se ele existir
      // na segunda parte passo os models como parametro
      .map(function (model) {
        return model.associate && model.associate(_this.connection.models);
      });
    }
  }]);

  return Database;
}();

exports.default = new Database();
//# sourceMappingURL=index.js.map