import { ApiProperty } from '@nestjs/swagger';

export class ChatMembersResponse {
  @ApiProperty({
    nullable: false,
    type: Number,
    example: '12',
  })
  userId: number;
  @ApiProperty({
    nullable: false,
    type: String,
    example: 'Satyxa',
  })
  username: string;
}
