import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BasicLoginAdminInput {
  @Field({ description: 'admin login' })
  login: string;
  @Field(() => String, { description: 'admin password' })
  password: string;
}
