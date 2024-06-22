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

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly notificationsService: NotificationsService) {}
  @WebSocketServer()
  server: Server;
  private clients = new Set();

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: any) {
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
    return this.notificationsService.create(createNotificationDto);
  }

  @SubscribeMessage('findAllNotifications')
  findAll(@MessageBody() data: any) {
    return 'hello';
    return this.notificationsService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationsService.findOne(id);
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: CreateNotificationDto) {
    return this.notificationsService.update(2, updateNotificationDto);
  }

  @SubscribeMessage('events')
  check(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.server.emit('dede', 'whatsapp');
    client.emit('dede', 'eade');
    setInterval(() => {}, 1000);
    return 'this.notificationsService.update(2, updateNotificationDto)';
  }
}
