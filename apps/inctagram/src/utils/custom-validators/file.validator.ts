import { FileValidator } from '@nestjs/common';
import sizeOf from 'image-size';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class CheckMimetype extends FileValidator<{ mimetype: string }> {
  currentType: string;
  constructor(options: { mimetype: string }) {
    super(options);
  }

  isValid(file: Express.Multer.File | IFile): boolean | Promise<boolean> {
    if ('buffer' in file) {
      try {
        const { type } = sizeOf(file.buffer);
        this.currentType = type;
        return !(type !== 'jpg' && type !== 'png');
      } catch (e) {
        return false;
      }
    }
  }
  buildErrorMessage(): string {
    return `File uploaded is invalid. File type is (${this.currentType})`;
  }
}
