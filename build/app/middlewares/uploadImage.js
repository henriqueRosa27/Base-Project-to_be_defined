'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _storageImage = require('../../config/storageImage');

var _storageImage2 = _interopRequireDefault(_storageImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadImageStorage = (0, _multer2.default)({
  storage: _storageImage2.default.storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb('Formato de arquivo inválido');
    }

    return cb(null, true);
  }
}).single('image');

exports.default = function (req, res, next) {
  uploadImageStorage(req, res, function (err) {
    if (err) return res.status(400).json({ errors: { errors: [err] } });
    return next();
  });
};
//# sourceMappingURL=uploadImage.js.map