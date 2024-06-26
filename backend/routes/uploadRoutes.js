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

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; //formats we will accept
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //test is to see if matches our regex
  const mimetype = filetypes.test(file.mimetype);
  if(extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
})

router.post('/', upload.single('image'), (req, res) => { //we are using single, bc we want to allow only a single file
  res.send({
    message: 'Image uploaded',
    image: `/${req.file.path}`
  })
})

export default router;