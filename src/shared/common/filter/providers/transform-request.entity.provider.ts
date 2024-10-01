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

  handleFiles(files: Express.Multer.File[], fieldName = "featuredImage") {
    if (files.length) {
      const modulePath = this.request.path.split("/")[3];
      const baseURL = `${this.request.protocol}://${this.request.headers.host}`;

      let fileUrls: string[] = [];
      fileUrls = files.map(file => `${baseURL}/public/uploads/${modulePath}/${file.filename}`);

      this.patch[fieldName] = fieldName === "featuredImage" || "avatar" ? fileUrls[0] : fileUrls;
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
        if (this.patch[key] === this.entity[key]) {
          delete this.patch[key];
        }
      });
    }
    return this;
  }

  getUpdatedEntity(): any {
    return this.entity;
  }
}
