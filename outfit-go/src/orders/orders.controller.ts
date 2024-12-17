import { Controller, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from 'src/DTO/order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/place')
  async placeOrder(@Body() createOrderDTO: CreateOrderDTO) {
    return this.ordersService.placeOrder(createOrderDTO);
  }
  @Post('place/:customerId')
  placeOrde(
    @Param('customerId') customerId: number,
    @Body() body: { items: { productId: number; quantity: number }[]; paymentMethod: string },
  ) {
    return this.ordersService.placeOrde(customerId, body.items, body.paymentMethod);
  }
}
