import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileSizeValidation {
  // Теперь метод принимает Buffer вместо файла
  static validateFileSize(maxSize: number, fileBuffer: Buffer) {
    // Проверяем размер Buffer (в байтах)
    if (fileBuffer.length > maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${maxSize / (1024 * 1024)} MB`,
      );
    }
  }
}
