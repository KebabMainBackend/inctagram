import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaymentsMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { isTomorrow, differenceInDays } from 'date-fns';

@Injectable()
export class NotificationsService {
  constructor(@Inject('PAYMENTS_SERVICE') private clientProxy: ClientProxy) {}

  async findAll(userId: number) {
    const response = {
      status: 1,
      data: 0,
    };
    const currentSub = await firstValueFrom(
      this.clientProxy.send(
        { cmd: PaymentsMicroserviceMessagesEnum.GET_CURRENT_SUBSCRIPTION },
        { userId },
      ),
    );
    if (currentSub?.errorCode === HttpStatus.NOT_FOUND) {
      response.status = HttpStatus.NOT_FOUND;
      response.data = 0;
      return response;
    }
    const sub = currentSub.subscription;
    if (sub.autoRenewal) {
      if (isTomorrow(sub.dateOfNextPayment)) {
        response.status = HttpStatus.OK;
        response.data = 1;
        return response;
      }
    }
    const day = differenceInDays(currentSub.expireAt, new Date());
    console.log(day, userId);
    if (day === 7) {
      response.status = HttpStatus.OK;
      response.data = 2;
      return response;
    }
    if (day === 1) {
      response.status = HttpStatus.OK;
      response.data = 3;
      return response;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }
}
