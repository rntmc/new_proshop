import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router();

const storage = multer.diskStorage({//here we define where we want to save our images(our case diskStorage, but it could be Amazon f.e.)
  destination(req, file, cb) { //cb is the callback
    cb(null, 'uploads/'); //null is for errors. 'uploads/' is where we want our uploads to go(in our case uploads in the root)
  },
  filename(req, file, cb){ //how our filenames will be formated
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}}`);
  }
}) 

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;