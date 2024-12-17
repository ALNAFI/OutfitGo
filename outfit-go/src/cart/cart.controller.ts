import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:customerId')
  addToCart(
    @Param('customerId') customerId: number,
    @Body() body: { productId: number; quantity: number },
  ) {
    const { productId, quantity } = body;
    return this.cartService.addToCart(customerId, productId, quantity);
  }

  @Get('view/:customerId')
  viewCart(@Param('customerId') customerId: number) {
    return this.cartService.viewCart(customerId);
  }

  @Delete('remove/:cartItemId')
  removeFromCart(@Param('cartItemId') cartItemId: number) {
    return this.cartService.removeFromCart(cartItemId);
  }

  @Delete('clear/:customerId')
  clearCart(@Param('customerId') customerId: number) {
    return this.cartService.clearCart(customerId);
  }
}
