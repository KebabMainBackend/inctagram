import { InputType, Field } from '@nestjs/graphql';
import { BanStatus } from '../../../../types/ban.types';

@InputType()
export class ChangeBanStatusOfUserInput {
  @Field(() => BanStatus, { description: 'BANNED/UNBANNED' })
  banStatus: BanStatus;
  @Field({ description: 'ban reason' })
  banReason: string;
}
