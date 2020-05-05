import { createWorker } from 'tesseract.js';

class OCRController {
  async create(req, res) {
    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage('por');
    await worker.initialize('por');

    // await worker.setParameters({
    //   tessedit_pageseg_mode: PSM.AUTO,
    // });
    const {
      data: { text },
    } = await worker.recognize(req.file.path);

    await worker.terminate();

    return res.json({ text, file: req.file });
  }
}

export default new OCRController();
