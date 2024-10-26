import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class TransformRequest {
  private request: Request;
  private patch: any;
  private entity: any;
  private baseURL: string;

  initEntity(request: Request, patch: any, entity: any) {
    this.request = request;
    this.patch = patch;
    this.entity = entity;
    this.baseURL = `${request.protocol}://${request.headers.host}`;
    return this;
  }

  cleanFiles() {
    const keysToCheck = ["files"];
    for (const key of keysToCheck) {
      if (!this.patch[key]) {
        this.entity[key] = [];
      }
    }
    return this;
  }

  handleFiles(files: Express.Multer.File[]) {
    if (files.length) {
      const modulePath = this.request.path.split("/")[3];

      const fileGroup = {};
      files.forEach(file => {
        const fileUrl = `${this.baseURL}/public/uploads/${modulePath}/${file.filename}`;
        const fieldname = file.fieldname.replace(/\[\d+\]$/, "");

        if (fileGroup[fieldname]) {
          fileGroup[fieldname].push(fileUrl);
        } else {
          fileGroup[fieldname] = [fileUrl];
        }
      });

      Object.keys(fileGroup).forEach(fieldname => {
        if (fileGroup[fieldname].length > 1) {
          this.patch[fieldname] = fileGroup[fieldname];
        } else {
          this.patch[fieldname] = fileGroup[fieldname][0];
        }
      });
    }
    return this;
  }

  updateEntity() {
    Object.keys(this.patch).forEach(key => {
      this.entity[key] = this.patch[key] ? this.patch[key] : this.entity[key];
    });
    return this;
  }

  checkDuplicate(keys: string[]) {
    if (keys && keys.length) {
      keys.forEach(key => {
        if (this.patch[key] == this.entity[key]) {
          delete this.entity[key];
        }
      });
    }
    return this;
  }

  getUpdatedEntity(): any {
    return this.entity;
  }
}
