import { ApiProperty } from '@nestjs/swagger';

export class ChatMessagesResponse {
  @ApiProperty({
    nullable: false,
    type: Number,
    example: 1,
  })
  id: number;
  @ApiProperty({
    nullable: false,
    type: Number,
    example: 12,
  })
  userId: number;
  @ApiProperty({
    nullable: true,
    type: String,
    example: 'пр кд чд',
  })
  message: string | null;
  @ApiProperty({
    nullable: true,
    type: String,
    example: null,
  })
  imgUrl: string | null;
  @ApiProperty({
    nullable: true,
    type: String,
    example: null,
  })
  voiceUrl: string | null;
  @ApiProperty({
    nullable: false,
    type: Date,
  })
  createdAt: Date;
}
