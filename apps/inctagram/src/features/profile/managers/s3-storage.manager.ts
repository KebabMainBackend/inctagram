import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3StorageManager {
  s3client;
  bucketName = process.env.YANDEX_BUCKET;
  constructor() {
    const region = 'us-east-1';
    this.s3client = new S3Client({
      region,
      endpoint: 'https://storage.yandexcloud.net',
      credentials: {
        accessKeyId: process.env.YANDEX_ID,
        secretAccessKey: process.env.YANDEX_SECRET,
      },
    });
  }
  async saveImage(userId: number, buffer: Buffer, extension: string) {
    const url = `media/users/${userId}/avatars/${userId}-avatar-${Date.now()}.${extension}`;
    const options = {
      Bucket: this.bucketName,
      Key: url,
      Body: buffer,
    };
    const command = new PutObjectCommand(options);
    try {
      await this.s3client.send(command);
      return {
        url,
      };
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
