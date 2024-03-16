import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3StorageManager {
  private s3client;
  private bucketName: string;
  constructor(private configService: ConfigService) {
    const region = 'us-east-1';
    this.s3client = new S3Client({
      region,
      endpoint: 'https://storage.yandexcloud.net',
      credentials: {
        accessKeyId: this.configService.get('YANDEX_ID'),
        secretAccessKey: this.configService.get('YANDEX_SECRET'),
      },
    });
    this.bucketName = this.configService.get('YANDEX_BUCKET');
  }
  async saveImage(buffer: Buffer, url: string) {
    const options = {
      Bucket: this.bucketName,
      Key: url,
      Body: buffer,
      ContentLength: buffer.length,
    };
    const command = new PutObjectCommand(options);
    try {
      const data = await this.s3client.send(command);
      return data.id;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async deleteImage(key: string) {
    const options = {
      Bucket: this.bucketName,
      Key: key,
    };
    const command = new DeleteObjectCommand(options);
    try {
      await this.s3client.send(command);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
