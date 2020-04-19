import multer from 'multer';
import storageImage from '../../config/storageImage';

const uploadImageStorage = multer({
  storage: storageImage.storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png'
    ) {
      return cb('Formato de arquivo inválido');
    }

    return cb(null, true);
  },
}).single('image');

export default (req, res, next) => {
  uploadImageStorage(req, res, (err) => {
    if (err) return res.status(400).json({ errors: { errors: [err] } });
    return next();
  });
};
