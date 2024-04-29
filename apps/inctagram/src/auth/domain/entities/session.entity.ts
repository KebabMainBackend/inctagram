import { BaseEntity } from '../../../utils/base.entity';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';

export class SessionEntity extends BaseEntity {
  id: number;
  userId: number;
  lastActiveDate: string;
  aliveTill: Date;
  device: DeviceEntity;
  devicesId: string;

  static create(userId: number, deviceId: string) {
    const currentTime = new Date();
    const session = new SessionEntity();
    session.userId = userId;
    session.lastActiveDate = currentTime.toISOString();
    session.aliveTill = add(currentTime, { minutes: 15 });
    session.devicesId = deviceId;
    return session;
  }
  update() {
    const currentTime = new Date();
    this.lastActiveDate = currentTime.toISOString();
    this.aliveTill = add(currentTime, { minutes: 15 });
  }
}

export class DeviceEntity {
  title: string;
  ip: string;
  id: string;

  static create(data: { ip: string; title: string }) {
    const device = new DeviceEntity();
    device.id = uuidv4();
    device.ip = data.ip;
    device.title = data.title;
    return device;
  }
}
