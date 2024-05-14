import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RequestUser {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
