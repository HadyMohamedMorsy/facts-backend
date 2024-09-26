import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const modulePath = req.path.split("/")[3];
      const dest = `src/uploads/${modulePath}`;
      callback(null, dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    },
  }),

  // File size limit (100kb)
  limits: {
    fileSize: 100 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new BadRequestException("Only .png or .jpg files are allowed!"), false);
    }
  },
};
