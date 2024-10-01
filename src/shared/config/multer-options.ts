import { BadRequestException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";

const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const modulePath = req.path.split("/")[3];
      const dest = join(process.cwd(), "public", "uploads", modulePath);

      if (!existsSync(dest)) {
        mkdirSync(dest, { recursive: true });
      }

      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    },
  }),

  limits: {
    fileSize: 100 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/svg+xml"
    ) {
      cb(null, true);
    } else {
      cb(new BadRequestException("Only .png or .jpg files are allowed!"), false);
    }
  },
};

export default multerOptions;
