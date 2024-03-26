import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
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
