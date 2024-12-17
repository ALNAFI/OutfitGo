import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '../entities/customer.entity';
import { ProductsService } from '../products/products.service';
import { CreateCustomerDTO, UpdateCustomerDTO } from 'src/DTO/customers.dto';

@Controller('customers')
export class CustomersController 
{
  constructor(private readonly customersService: CustomersService,private readonly productsService: ProductsService,) {}
  
@Post('/login')
async loginCustomer(@Body() data: { email: string; password: string }) 
{
  return this.customersService.login(data);
}
@Post('/reg')
regCustomer(@Body() data: CreateCustomerDTO) 
  {
    return this.customersService.regCustomer(data);
  }
@Patch('update/:id')
  updateCustomer
  (
    @Param('id') id: number,
    @Body() data: UpdateCustomerDTO,
  ) 
    {
      return this.customersService.updateCustomer(id, data);
    }
  @Delete('delete/:id')
  remove(@Param('id') id: number) 
  {
    return this.customersService.deleteUser(id);
  }
  
  @Get('products/all')
  getAllProducts() 
  {
  return this.productsService.showAllproducts();
  }

  @Get('products/all/:query')
  async searchUser(@Param('query') query: string) 
  {
    return this.productsService.searchproducts(query);
  }

  @Get('customers/all')
  findAll() 
  {
    return this.customersService.showAllcustomers();
  }

  @Get('customers/all/:query')
  async searcustomer(@Param('query') query: string) 
  {
    return this.customersService.searchcustomer(query);
  }
}
