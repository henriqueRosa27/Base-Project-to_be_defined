'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tesseract = require('tesseract.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OCRController = function () {
    function OCRController() {
        _classCallCheck(this, OCRController);
    }

    _createClass(OCRController, [{
        key: 'create',
        value: async function create(req, res) {
            var worker = (0, _tesseract.createWorker)();

            await worker.load();
            await worker.loadLanguage('por');
            await worker.initialize('por');

            // await worker.setParameters({
            //   tessedit_pageseg_mode: PSM.AUTO,
            // });

            var _ref = await worker.recognize(req.file.path),
                text = _ref.data.text;

            await worker.terminate();

            return res.json({ text: text, file: req.file });
        }
    }]);

    return OCRController;
}();

exports.default = new OCRController();
//# sourceMappingURL=OCRController.js.map