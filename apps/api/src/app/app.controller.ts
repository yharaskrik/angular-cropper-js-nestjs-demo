import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Response,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';

@Controller('file')
export class AppController {
  private fileNumber = 0;

  private files: Record<string, Express.Multer.File> = {};

  @Get(':fileId')
  getFile(
    @Param('fileId') fileId: string,
    @Response({ passthrough: true }) response
  ) {
    const file = this.files[fileId];

    console.log(this.files);

    if (!file) {
      throw new NotFoundException();
    }

    response.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `inline; filename="${fileId}.${
        file.mimetype.split('/')[1]
      }"`,
    });

    return new StreamableFile(file.buffer);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const fileNumber = this.fileNumber.toString();

    this.fileNumber = this.fileNumber + 1;

    this.files[fileNumber] = file;

    console.log('Stored', fileNumber);

    return {
      id: fileNumber,
    };
  }
}
