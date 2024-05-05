import { Module } from '@nestjs/common';
import { AdminResolver } from './api/admin.resolver';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [AdminResolver],
})
export class AdminModule {}
