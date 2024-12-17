import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from '../entities/support.entity';
import { CreateSupportTicketDTO, UpdateSupportTicketDTO } from '../DTO/support.dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private readonly supportTicketRepository: Repository<SupportTicket>,
  ) {}

  async report(data: CreateSupportTicketDTO) {
    const ticket = this.supportTicketRepository.create(data);
    await this.supportTicketRepository.save(ticket);
    return { message: 'Support ticket created successfully!', ticket };
  }

  async viewReport(id: number) {
    return this.supportTicketRepository.find({ where: { id } });
  }

  async updateReport(id: number, data: UpdateSupportTicketDTO) {
    const ticket = await this.supportTicketRepository.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    await this.supportTicketRepository.update(id, data);
    return { message: 'Ticket updated successfully!' };
  }
}
