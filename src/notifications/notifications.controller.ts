import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { NotificationsDto, ResetBadgeCountDto } from "./notifications.dto";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get("/")
  getNotifications(@Query() query: NotificationsDto) {
    return this.notificationsService.getNotifications(query);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post("/reset-badge")
  resetBadgeCount(@Body() body: ResetBadgeCountDto) {
    return this.notificationsService.resetBadgeCountNotification(body);
  }
}
