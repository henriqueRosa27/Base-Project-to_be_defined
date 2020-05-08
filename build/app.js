'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes2 = require('./routes');

var _routes3 = _interopRequireDefault(_routes2);

require('./database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.server = (0, _express2.default)();

    this.middlewares();
    this.routes();
  }

  _createClass(App, [{
    key: 'middlewares',
    value: function middlewares() {
      this.server.use(_express2.default.json());
      this.server.use((0, _cors2.default)());
      this.server.use('/files', _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads')));
    }
  }, {
    key: 'routes',
    value: function routes() {
      this.server.use(_routes3.default);
    }
  }]);

  return App;
}();

exports.default = new App().server;
//# sourceMappingURL=app.js.map