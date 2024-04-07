import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import ObjectId from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!ObjectId.isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
