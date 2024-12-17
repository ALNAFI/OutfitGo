import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportTicketDTO, UpdateSupportTicketDTO } from 'src/DTO/support.dto';


@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('/report')
  createTicket(@Body() data: CreateSupportTicketDTO) {
    return this.supportService.report(data);
  }

  @Get('/view/:id')
  viewReport(@Param('id') id: number) {
    return this.supportService.viewReport(id);
  }

  @Patch('/update/:id')
  updateReport(
    @Param('id') id: number,
    @Body() data: UpdateSupportTicketDTO,
  ) {
    return this.supportService.updateReport(id, data);
  }
}
