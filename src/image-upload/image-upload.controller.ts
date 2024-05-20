import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('image-upload')
export class ImageUploadController {
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: 'E:/fitness-center/fitness-center/src/assets/trainers',
        filename: (req, file, cb) => {
          cb(null, file.originalname.replace(/[^a-zA-Z0-9.]/g, ''));
        },
      }),
    }),
  )
  @Post('trainer-image')
  async trainerImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 100000000,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      statusCode: 200,
      data: file.originalname.replace(/[^a-zA-Z0-9.]/g, ''),
    };
  }
}
