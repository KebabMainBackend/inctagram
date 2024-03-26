import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import ObjectId from 'mongoose';

@ValidatorConstraint({ name: 'IsObjectId', async: true })
@Injectable()
export class IsObjectId implements ValidatorConstraintInterface {
  constructor() {}
  async validate(ids: string[]) {
    return ids.every((id) => ObjectId.isValidObjectId(id));
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `each value in ${validationArguments?.property} must be a ObjectId`;
  }
}

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!ObjectId.isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
