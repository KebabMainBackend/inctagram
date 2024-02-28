import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../../prisma.service'
import { PostsController } from './api/posts.controller'
import { AuthModule } from '../../auth/auth.module';
import { UsersRepository } from '../../auth/db/users.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsQueryRepository } from './rep/posts.repository';


@Module({
	imports: [
		CqrsModule,
		ClientsModule.register([
			{
				name: 'FILES_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						'amqps://faqtdshr:G9jGzo6PGzV8RMQqVr6F1G0mk0Ze39uz@dingo.rmq.cloudamqp.com/faqtdshr',
					],
					queue: 'file-upload',
					queueOptions: {
						durable: false,
					},
				},
			},
		]),
	],
	controllers: [PostsController],
	providers: [
		PostsQueryRepository,
		UsersRepository,
		PrismaClient,
		PrismaService,
		JwtService,
		ConfigService,
		// FirebaseAdapter,
		// Base64Service,
		// UploadPostImageUseCase,
		// DeletePostImageCommand
	]
})
export class PostsModule {
}
