import { BaseEntity } from '../../utils/base.entity';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';

export class SessionEntity extends BaseEntity {
  id: number;
  userId: number;
  lastActiveDate: string;
  aliveTill: Date;
  devices: DeviceEntity[];
  deviceId: string;

  static create(userId: number, deviceId: string) {
    const currentTime = new Date();
    const session = new SessionEntity();
    session.aliveTill = add(currentTime, { minutes: 15 });
    session.userId = userId;
    session.lastActiveDate = currentTime.toISOString();
    session.deviceId = deviceId;
    return session;
  }
}

export class DeviceEntity {
  title: string;
  ip: string;
  deviceId: string;

  static create(data: { ip: string; title: string }) {
    const device = new DeviceEntity();
    device.deviceId = uuidv4();
    device.ip = data.ip;
    device.title = data.title;
    return device;
  }
}
