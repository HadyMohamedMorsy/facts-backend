import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as multer from "multer";

export interface MulterArrayRequest extends Request {
  files: Express.Multer.File[]; // This is for multiple file uploads
}

@Injectable()
export class UploadFilesMiddleware implements NestMiddleware {
  use(req: MulterArrayRequest, res: Response, next: () => void) {
    const modulePath = req.baseUrl.split("/")[3];
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
        if (file.fieldname === "featuredImages") {
          // Ensure this matches your input's name attribute
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }).array("featuredImages", 10); // Change '10' to limit the number of files

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
      if (req.files && req.files.length > 0) {
        const baseURL = req.protocol + "://" + req.headers.host;
        const newUrl = new URL(req.url, baseURL);
        req.body.featuredImages = req.files.map(
          file => `${newUrl.origin}${newUrl.pathname}uploads/${modulePath}/${file.filename}`,
        );
      }
      next();
    });
  }
}
