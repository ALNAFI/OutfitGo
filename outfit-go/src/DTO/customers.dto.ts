import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  MinLength, 
  IsBoolean, 
  Matches 
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
export class CreateCustomerDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty({ message: 'Confirm Password is required' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Address is required' })
  adress: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCustomerDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password?: string;

  @IsOptional()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Address cannot be empty' })
  adress?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
