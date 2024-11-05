import { Request } from "express";
import { existsSync, unlink } from "fs";
import { join } from "path";

export function cleanFilesWithError(files: Express.Multer.File[]) {
  for (const file of files) {
    if (existsSync(file.path)) {
      unlink(file.path, err => {
        if (err) {
          throw err;
        }
        console.log(`${file.path} was deleted`);
      });
    } else {
      console.log(`File ${file.path} does not exist, skipping deletion.`);
    }
  }
}

export function checkUpdateFiles(entity: any, patch: any, request: Request) {
  const keysToCheck = ["files"];
  for (const key of keysToCheck) {
    if (!entity[key]) return;

    for (const url of entity[key]) {
      if (!patch[key].includes(url)) {
        deleteFile(url, request);
      }
    }
  }
}

export function deleteFile(url: string, request: Request) {
  const fileName = url.split("/").pop();
  const modulePath = request.path.split("/")[3];
  const fullPath = join(process.cwd(), "public", "uploads", modulePath, fileName);
  const exists = existsSync(fullPath);

  if (exists) {
    unlink(fullPath, err => {
      if (err) throw err;
      console.log(`${fullPath} was deleted`);
    });
  } else {
    console.log(`No file to delete at ${fullPath}`);
  }
}
