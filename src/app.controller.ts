import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Picture } from './dto/picture';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 2000000,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.appService.uploadFile(file);
  }

  @Post('delete')
  async deleteFile(@Body() picture: Picture) {
    return await this.appService.deleteFile(picture);
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('images', null, {
      limits: { fileSize: 2000000 },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    return await this.appService.uploadFiles(files);
  }
}
