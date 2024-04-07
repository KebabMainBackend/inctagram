import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SecurityDevicesModule } from './features/security-devices/security-devices.module';
import { ProfileModule } from './features/profile/profile.module';
import { PostsModule } from './features/posts/posts.module';
import { SubscriptionsModule } from './features/subscriptions/subscriptions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        'D:\\job\\inctagram\\apps\\inctagram\\swagger-static',
        //'C:\\Projects\\intership\\inctagram\\apps\\inctagram\\swagger-static',
      ),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    AuthModule,
    SecurityDevicesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 5,
      },
    ]),
    PostsModule,
    ProfileModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
