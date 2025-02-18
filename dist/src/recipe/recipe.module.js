"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModule = void 0;
const common_1 = require("@nestjs/common");
const recipe_controller_1 = require("./recipe.controller");
const recipe_service_1 = require("./recipe.service");
const prisma_service_1 = require("../../prisma.service");
const s3_service_1 = require("../s3/s3.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const ingredients_service_1 = require("../ingredients/ingredients.service");
const units_service_1 = require("../units/units.service");
const steps_service_1 = require("../steps/steps.service");
let RecipeModule = class RecipeModule {
};
exports.RecipeModule = RecipeModule;
exports.RecipeModule = RecipeModule = __decorate([
    (0, common_1.Module)({
        controllers: [recipe_controller_1.RecipeController],
        providers: [recipe_service_1.RecipeService, prisma_service_1.PrismaService, client_s3_1.S3Client, s3_service_1.S3Service, ingredients_service_1.IngredientsService, units_service_1.UnitsService, steps_service_1.StepsService],
    })
], RecipeModule);
//# sourceMappingURL=recipe.module.js.map