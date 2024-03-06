import { Module } from '@nestjs/common';
import { FilesController } from './api/files.controller';
import { FilesService } from './files.service';
import { databaseProviders } from './providers/database.providers';
import { S3StorageManager } from './adapters/s3-storage.adapter';
import { ConfigModule } from '@nestjs/config';
import { filesProviders } from './providers/files.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { UploadFileHandler } from './application/use-cases/upload-file.command';

const CommandHandlers = [UploadFileHandler];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
  ],
  controllers: [FilesController],
  providers: [
    FilesService,
    S3StorageManager,
    ...databaseProviders,
    ...filesProviders,
    ...CommandHandlers,
  ],
})
export class FilesModule {}
