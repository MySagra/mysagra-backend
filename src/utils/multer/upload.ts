import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if(
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ){
        cb(null, true)
    }
    else{
        cb(new Error('File not supported, allowed only jpeg and png files'));
    }
}

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
        return cb(null, path.join(__dirname, '../../../public/uploads/categories'));
    },
    filename: function(req: Request, file: Express.Multer.File, cb) {
        const id = req.params?.id
        const ext = path.extname(file.originalname);
        cb(null, `category-${id}-${Date.now()}${ext}`);
    }
})

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // max 5MB
});