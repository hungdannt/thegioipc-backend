import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { diskStorage } from "multer";
import { extname } from "path";
import { storage } from "./storage.config";

@Controller()
export class UploadController {
  @Post("upload") // API path
  @UseInterceptors(FileInterceptor("file", { storage }))
  async upload(@UploadedFile() file) {
    return file;
  }
}
