"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./public/users/users.module");
const email_module_1 = require("./email/email.module");
const token_module_1 = require("./token/token.module");
const recipe_module_1 = require("./recipe/recipe.module");
const steps_module_1 = require("./steps/steps.module");
const s3_service_1 = require("./s3/s3.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_module_1 = require("./s3/s3.module");
const ingredients_module_1 = require("./ingredients/ingredients.module");
const units_module_1 = require("./units/units.module");
const favorites_module_1 = require("./favorites/favorites.module");
const notifications_service_1 = require("./notifications/notifications.service");
const devices_service_1 = require("./devices/devices.service");
const devices_module_1 = require("./devices/devices.module");
const prisma_service_1 = require("./prisma.service");
const expo_module_1 = require("./expo/expo.module");
const expo_server_sdk_1 = require("expo-server-sdk");
const expo_service_1 = require("./expo/expo.service");
const notifications_controller_1 = require("./notifications/notifications.controller");
const schedule_1 = require("@nestjs/schedule");
const task_service_1 = require("./task/task.service");
const ai_service_1 = require("./ai/ai.service");
const health_module_1 = require("./health/health.module");
const terminus_1 = require("@nestjs/terminus");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            email_module_1.EmailModule,
            token_module_1.TokenModule,
            recipe_module_1.RecipeModule,
            steps_module_1.StepModule,
            ingredients_module_1.IngredientsModule,
            s3_module_1.S3Module,
            units_module_1.UnitsModule,
            favorites_module_1.FavoritesModule,
            devices_module_1.DevicesModule,
            expo_module_1.ExpoModule,
            schedule_1.ScheduleModule.forRoot(),
            health_module_1.HealthModule,
            terminus_1.TerminusModule,
        ],
        providers: [
            s3_service_1.S3Service,
            client_s3_1.S3Client,
            notifications_service_1.NotificationsService,
            devices_service_1.DevicesService,
            prisma_service_1.PrismaService,
            expo_server_sdk_1.default,
            expo_service_1.ExpoService,
            task_service_1.TaskService,
            ai_service_1.AiService,
        ],
        controllers: [notifications_controller_1.NotificationsController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map