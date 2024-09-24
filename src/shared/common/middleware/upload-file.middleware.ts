import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as multer from "multer";

export interface MulterSingleRequest extends Request {
  file: Express.Multer.File; // This is for single file uploads
}

@Injectable()
export class UploadFileMiddleware implements NestMiddleware {
  use(req: MulterSingleRequest, res: Response, next: () => void) {
    const modulePath = req.path.split("/")[3];
    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          const dest = `src/uploads/${modulePath}`;
          callback(null, dest);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname.replaceAll(" ", "-")}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (file.fieldname === "featuredImage") {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }).single("featuredImage");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer Error:", err);
        return res.status(500).send(err.message);
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown Error:", err);
        return res.status(500).send(err.message);
      }
      const baseURL = req.protocol + "://" + req.headers.host;
      const newUrl = new URL(req.url, baseURL);
      req.body.featuredImage = `${newUrl.origin}${newUrl.pathname}uploads/${modulePath}/${req.file.filename}`;

      next();
    });
  }
}
