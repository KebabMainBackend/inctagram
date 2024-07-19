import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { NotificationsService } from '../application/notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Socket, Server } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsBearerAuthGuard } from '../../../auth/guards/ws-bearer-auth.guard';
import { UserTypes } from '../../../types';
import { WsUser } from '../../../utils/decorators/ws-user.decorator';
import { WsExceptionFilter } from '../../../modules/filters/ws-exception.filter';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
@UseFilters(WsExceptionFilter)
@UseGuards(WsBearerAuthGuard)
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly notificationsService: NotificationsService) {}
  @WebSocketServer()
  server: Server;
  private clients = new Set();

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  @UseGuards(WsBearerAuthGuard)
  async handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
  }

  @SubscribeMessage('findAllNotifications')
  findAll(@ConnectedSocket() client: Socket, @WsUser() user: UserTypes) {
    return this.notificationsService.findAll(user.id);
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationsService.findOne(id);
  }

  @SubscribeMessage('events')
  check(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    @WsUser() user: UserTypes,
  ) {
    console.log(user);
    // this.server.sockets.emit('dede', 'ererere');
    setInterval(() => {
      client.emit('dede', 'eade');
    }, 1000);

    return 'this.notificationsService.update(2, updateNotificationDto)';
  }
}
