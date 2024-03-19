import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TcpClientOptions} from "@nestjs/microservices/interfaces/client-metadata.interface";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";
import {PrismaService} from "../../prisma.service";
import {EmailService} from "../../auth/managers/email.manager";
import {SubscriptionRepository} from "./db/subscription.repository";
import {SubscriptionsController} from "./api/subscriptions.controller";
import {UsersRepository} from "../../auth/db/users.repository";

const Repos = [
    EmailService,
    SubscriptionRepository,
    UsersRepository
]
@Module({
    imports: [CqrsModule, JwtModule, ConfigModule],
    controllers: [SubscriptionsController],
    providers: [
        {
            provide: 'FILES_SERVICE',
            useFactory: (configService: ConfigService) => {
                const options: TcpClientOptions = {
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('FILES_SERVICE_HOST'),
                        port: configService.get('FILES_SERVICE_PORT'),
                    },
                };
                return ClientProxyFactory.create(options);
            },
            inject: [ConfigService],
        },
        PrismaService,
        ...Repos,
    ],
})
export class SubscriptionsModule {}