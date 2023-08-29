import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) throw new HttpException({ message: 'File is require' }, 400);
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            allowed_formats: ['mp4', 'jpg', 'png'],
            folder: 'food_blog',
          },
          (error, result) => {
            if (error) {
              const message = error.message || 'Internal server';
              const status =
                error.http_code || HttpStatus.INTERNAL_SERVER_ERROR;

              return reject(new HttpException({ message }, status));
            }
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }
}
