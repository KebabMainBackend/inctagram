import { Module } from '@nestjs/common';
import { PaymentsController } from './api/payments.controller';
import { PaymentsService } from './payments.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
