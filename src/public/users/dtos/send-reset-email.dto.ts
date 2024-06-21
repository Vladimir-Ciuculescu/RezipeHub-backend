import { IsString } from 'class-validator';

export class SendResetEmailDto {
  @IsString()
  email: string;
}
