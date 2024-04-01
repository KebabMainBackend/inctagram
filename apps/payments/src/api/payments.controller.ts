import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from '../payments.service';
import { MessagePattern } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../../../../types/messages';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern({ cmd: 'hello-rmq' })
  async get(data: { lol: number }) {
    return data.lol + 456;
  }
}
