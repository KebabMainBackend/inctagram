import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BasicLoginAdminInput {
  @Field({ description: 'admin login' })
  login: string;
  @Field({ description: 'admin password' })
  password: string;
}
