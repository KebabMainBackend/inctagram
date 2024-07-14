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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AdminModule } from './features/admin/admin.module';
import { NotificationsModule } from './features/notifications/notifications.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        // 'C:\\Projects\\inctagram\\apps\\inctagram\\swagger-static',
        'D:\\job\\inctagram\\apps\\inctagram\\swagger-static',
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: 'api/v1/graphql',
      introspection: true,
      playground: true,
      autoSchemaFile: true,
      include: [AdminModule],
      subscriptions: {
        'graphql-ws': true,
      },
      formatError: (err) => {
        return { message: err.message, path: err.path };
      },
      context: ({ req, res, connection }) => {
        if (connection) {
          // If this WebSocket connection
          // Return context for WebSocket connection
          return {
            req: connection.context,
          };
        }
        return { req, res };
      },
    }),
    AdminModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
