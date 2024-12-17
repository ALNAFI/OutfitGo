import { IsNotEmpty } from "class-validator";

export class CreateSupportTicketDTO {
    
    customerId: number;
    subject: string;
    message: string;
  }
  
  export class UpdateSupportTicketDTO {
    @IsNotEmpty({ message: 'Name is required' })
    status: string;
  }
  