import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
@Injectable()
export class CustomersService 
{
  constructor
  (
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}
 // Login function
 async login(data: { email: string; password: string }) 
 {
  const customer = await this.customerRepository.findOne({ where: { email: data.email } });
  if (!customer) 
  {
    throw new NotFoundException('No user found with this email.');
  }
  if (data.password !== customer.password) 
  {
    throw new UnauthorizedException('Wrong password. Please try again.');
  }
  return { message: 'Login successful'};
}
  //Registration customer
    async regCustomer(data: Partial<Customer>) 
    {
      const existingCustome = await this.customerRepository.findOne({ where: { email: data.email } });
      if (existingCustome) 
        {
            throw new ConflictException(`Customer with email ${data.email} already exists.`);
        }
      const newCustomer = this.customerRepository.create(data); 
      await this.customerRepository.save(newCustomer);
      return { message: 'Congratulations, your account has been successfully created.', customer: newCustomer };
    }
    async updateCustomer(id: number, updatedData: Partial<Customer>) {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      if (updatedData.email && updatedData.email !== customer.email) {
        const existingCustomerWithEmail = await this.customerRepository.findOne({
          where: { email: updatedData.email },
        });
        if (existingCustomerWithEmail && existingCustomerWithEmail.id !== id) {
          throw new ConflictException(
            `Email '${updatedData.email}' is already in use by another user`,
          );
        }
      }
      await this.customerRepository.update(id, updatedData);
      const updatedCustomer = await this.customerRepository.findOne({ where: { id } });
      return { message: 'User updated successfully!', customer: updatedCustomer };
    }
    
  async deleteUser(id: number) 
  {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) 
      {
         throw new NotFoundException(`User with ID ${id} not found`);
      }
    return { message: `User with ID ${id} deleted successfully!` };
  }
  async showAllcustomers() 
  {
    const users = await this.customerRepository.find();
    return { message: 'All Products are retrieved!', users };
  }
  async searchcustomer(query: string) 
  {
    const users = await this.customerRepository.find({
      where: 
      [
        //{ name: Like(`%${query}%`) },  
        { email: Like(`%${query}%`) }, 
      ],
    });
    return users.length > 0
      ? { message: 'Matching user found!', users }
      : { message: 'No matching user found!', users: [] };
}
}

