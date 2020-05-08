'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _UserController = require('../app/controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _ClassController = require('../app/controllers/ClassController');

var _ClassController2 = _interopRequireDefault(_ClassController);

var _SessionController = require('../app/controllers/SessionController');

var _SessionController2 = _interopRequireDefault(_SessionController);

var _StudentClassContoller = require('../app/controllers/StudentClassContoller');

var _StudentClassContoller2 = _interopRequireDefault(_StudentClassContoller);

var _ActivityController = require('../app/controllers/ActivityController');

var _ActivityController2 = _interopRequireDefault(_ActivityController);

var _ActivityDeliveryController = require('../app/controllers/ActivityDeliveryController');

var _ActivityDeliveryController2 = _interopRequireDefault(_ActivityDeliveryController);

var _OCRController = require('../app/controllers/OCRController');

var _OCRController2 = _interopRequireDefault(_OCRController);

var _auth = require('../app/middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _uploadImage = require('../app/middlewares/uploadImage');

var _uploadImage2 = _interopRequireDefault(_uploadImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.post('/ocr', _uploadImage2.default, _OCRController2.default.create);

routes.post('/user', _UserController2.default.create);
routes.post('/login', _SessionController2.default.login);

routes.use(_auth2.default);

routes.get('/user', _UserController2.default.getAll);
routes.get('/user/:id', _UserController2.default.getById);

routes.get('/class', _ClassController2.default.getAll);
routes.get('/class/:id', _ClassController2.default.getById);
routes.get('/class/byCode/:code', _ClassController2.default.getByCode);
routes.post('/class', _ClassController2.default.create);
routes.put('/class/:id', _ClassController2.default.update);
routes.delete('/class/:id', _ClassController2.default.delete);

routes.post('/linkUserClass/code', _StudentClassContoller2.default.linkByCode);
routes.post('/linkUserClass/email', _StudentClassContoller2.default.linkByEmail);

routes.get('/activity', _ActivityController2.default.getAll);
routes.get('/activity/:id', _ActivityController2.default.getById);
routes.post('/activity', _ActivityController2.default.create);
routes.put('/activity/:id', _ActivityController2.default.update);
routes.delete('/activity/:id', _ActivityController2.default.delete);

routes.get('/activityDelivery', _ActivityDeliveryController2.default.getAll);
routes.get('/activityDelivery/:id', _ActivityDeliveryController2.default.getById);
routes.post('/activityDelivery', _uploadImage2.default, _ActivityDeliveryController2.default.create);
routes.put('/activityDelivery/sendFeedback', _ActivityDeliveryController2.default.sendFeedback);

exports.default = routes;
//# sourceMappingURL=index.js.map