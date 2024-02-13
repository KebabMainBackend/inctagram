import { BaseEntity } from '../../utils/base.entity';
import { SessionEntity } from './session.entity';
import { OauthProviderEntity } from './oauth-provider.entity';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';

export class UserEntity extends BaseEntity {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  passwordSalt: string;
  isConfirmed: boolean;
  isDeleted: boolean;
  providerId: string;
  providers: OauthProviderEntity[];
  sessionId: number;
  sessions: SessionEntity[];
  confirmationData: UserConfirmationEntity | null;

  static create(data: {
    email: string;
    username: string;
    isConfirmed: boolean;
  }) {
    const user = new UserEntity();
    user.email = data.email;
    user.username = data.username;
    user.isConfirmed = data.isConfirmed;
    return user;
  }
}

export class UserConfirmationEntity extends BaseEntity {
  id: number;
  confirmationCode: string;
  codeExpirationDate: Date;
  userId: number;

  static create(userId: number) {
    const code = uuidv4();
    const codeExpirationDate = add(new Date(), {
      minutes: 3,
    });
    const userConfirmation = new UserConfirmationEntity();
    userConfirmation.confirmationCode = code;
    userConfirmation.codeExpirationDate = codeExpirationDate;
    userConfirmation.userId = userId;
    return userConfirmation;
  }
}
