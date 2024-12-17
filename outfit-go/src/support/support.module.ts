import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { SupportTicket } from 'src/entities/support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportTicket])],
  controllers: [SupportController],
  providers: [SupportService],
  exports: [TypeOrmModule],
})
export class SupportModule {}
