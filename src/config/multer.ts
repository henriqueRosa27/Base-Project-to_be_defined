import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import AppError from '../errors/AppError';

const tmpFolder = path.resolve(
  __dirname,
  '..',
  '..',
  'tmp',
  'ActivityDelivery'
);

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
  fileFilter: (request: any, file: Express.Multer.File, cb: any) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new AppError('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
};
