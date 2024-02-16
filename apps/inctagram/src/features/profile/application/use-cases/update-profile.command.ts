import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileRepository } from '../../db/profile.repository';
import { UpdateProfileDto } from '../../api/dto/update-profile.dto';
import { PrismaService } from '../../../../prisma.service';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import { differenceInCalendarYears } from 'date-fns';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorMessage } from '../../../../utils/create-error-object';

export class UpdateProfileCommand {
  constructor(
    public data: UpdateProfileDto,
    public userId: number,
  ) {}
}

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    private profileRepo: ProfileRepository,
    private prisma: PrismaService,
  ) {}

  async execute({ data, userId }: UpdateProfileCommand) {
    const currentDate = new Date();
    const birthDate = new Date(data.birthDate);
    const age = differenceInCalendarYears(currentDate, birthDate);
    if (age < 13) {
      const error = createErrorMessage(
        'A user under 13 cannot create a profile',
        'birthDate',
      );
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    await this.update(data, userId);
    return;
  }
  async update(data: UpdateProfileDto, userId: number) {
    return this.prisma.$transaction(async () => {
      await this.profileRepo.updateUserUsername(data.username, userId);
      const newProfile = ProfileEntity.create(data, userId);
      await this.profileRepo.updateProfile(userId, newProfile);
    });
  }
}
