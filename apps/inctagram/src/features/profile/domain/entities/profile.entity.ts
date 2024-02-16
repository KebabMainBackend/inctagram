import { BaseEntity } from '../../../../utils/base.entity';
import { UpdateProfileDto } from '../../api/dto/update-profile.dto';

export class ProfileEntity extends BaseEntity {
  userId: number;
  firstname: string;
  lastname: string;
  birthDate: string;
  aboutMe?: string;
  avatarUrl?: string;
  city?: string;

  static create(data: UpdateProfileDto, userId: number) {
    const { aboutMe, city, firstname, lastname, birthDate } = data;
    const user = new ProfileEntity();
    user.userId = userId;
    user.firstname = firstname;
    user.lastname = lastname;
    if (birthDate) {
      user.birthDate = birthDate;
    }
    if (aboutMe) {
      user.aboutMe = aboutMe;
    }
    if (city) {
      user.city = city;
    }
    return user;
  }
}
