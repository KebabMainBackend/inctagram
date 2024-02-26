import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

export class CreateAccessTokenCommand {
  constructor(public userId: number) {}
}

@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenHandler
  implements ICommandHandler<CreateAccessTokenCommand>
{
  constructor(private jwtService: JwtService) {}
  execute({ userId }: CreateAccessTokenCommand) {
    return this.jwtService.signAsync({ userId });
  }
}
