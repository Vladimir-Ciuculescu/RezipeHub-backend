import { Body, Controller, HttpCode, Post, Query } from "@nestjs/common";
import { TokenService } from "./token.service";
import { CreateTokenDto } from "./dtos/create-token.dto";
import { ConfirmTokenDto } from "./dtos/confirm-token.dto";
import { SendResetEmailDto } from "../public/users/dtos/send-reset-email.dto";

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @HttpCode(200)
  @Post("/confirm")
  confirmToken(@Body() body: ConfirmTokenDto) {
    return this.tokenService.confirmToken(body);
  }

  @HttpCode(201)
  @Post("/resend")
  resendToken(@Query() query: CreateTokenDto) {
    return this.tokenService.resendToken(query);
  }

  @HttpCode(200)
  @Post("/send-reset-email")
  sendResetEmail(@Body() body: SendResetEmailDto) {
    return this.tokenService.generateResetPasswordToken(body);
  }
}
