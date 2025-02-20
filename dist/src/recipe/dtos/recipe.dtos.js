"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeBriefInfoDto = exports.RecipesPerUserDto = exports.ByCategoryRecipesDto = exports.MostPopularRecipesDto = exports.LatestRecipesDto = exports.RecipesDto = exports.EditRecipePhotoDto = exports.EditRecipeDto = exports.EditRecipeObjectDto = exports.CreateRecipeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../types/enums");
const ingredient_dto_1 = require("../../ingredients/dtos/ingredient.dto");
const steps_dto_1 = require("../../steps/dtos/steps.dto");
class CreateRecipeDto {
}
exports.CreateRecipeDto = CreateRecipeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecipeDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecipeDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRecipeDto.prototype, "servings", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecipeDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RecipeType),
    __metadata("design:type", String)
], CreateRecipeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRecipeDto.prototype, "preparationTime", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ingredient_dto_1.IngredientDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateRecipeDto.prototype, "ingredients", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => steps_dto_1.StepDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateRecipeDto.prototype, "steps", void 0);
class EditRecipeObjectDto {
}
exports.EditRecipeObjectDto = EditRecipeObjectDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditRecipeObjectDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditRecipeObjectDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditRecipeObjectDto.prototype, "servings", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditRecipeObjectDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RecipeType),
    __metadata("design:type", String)
], EditRecipeObjectDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditRecipeObjectDto.prototype, "preparationTime", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ingredient_dto_1.EditIngredientDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], EditRecipeObjectDto.prototype, "ingredients", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => steps_dto_1.EditStepDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], EditRecipeObjectDto.prototype, "steps", void 0);
class EditRecipeDto {
}
exports.EditRecipeDto = EditRecipeDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EditRecipeObjectDto),
    __metadata("design:type", EditRecipeObjectDto)
], EditRecipeDto.prototype, "recipe", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], EditRecipeDto.prototype, "ingredientsIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], EditRecipeDto.prototype, "stepsIds", void 0);
class EditRecipePhotoDto {
}
exports.EditRecipePhotoDto = EditRecipePhotoDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditRecipePhotoDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditRecipePhotoDto.prototype, "photoUrl", void 0);
class RecipesDto {
}
exports.RecipesDto = RecipesDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], RecipesDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipesDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecipesDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [])),
    __metadata("design:type", Array)
], RecipesDto.prototype, "caloriesRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value.map(Number) : [])),
    __metadata("design:type", Array)
], RecipesDto.prototype, "preparationTimeRange", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], RecipesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], RecipesDto.prototype, "limit", void 0);
class LatestRecipesDto {
}
exports.LatestRecipesDto = LatestRecipesDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], LatestRecipesDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], LatestRecipesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], LatestRecipesDto.prototype, "limit", void 0);
class MostPopularRecipesDto {
}
exports.MostPopularRecipesDto = MostPopularRecipesDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], MostPopularRecipesDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], MostPopularRecipesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], MostPopularRecipesDto.prototype, "limit", void 0);
class ByCategoryRecipesDto {
}
exports.ByCategoryRecipesDto = ByCategoryRecipesDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], ByCategoryRecipesDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], ByCategoryRecipesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], ByCategoryRecipesDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ByCategoryRecipesDto.prototype, "category", void 0);
class RecipesPerUserDto {
}
exports.RecipesPerUserDto = RecipesPerUserDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], RecipesPerUserDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], RecipesPerUserDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], RecipesPerUserDto.prototype, "userId", void 0);
class RecipeBriefInfoDto {
}
exports.RecipeBriefInfoDto = RecipeBriefInfoDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RecipeBriefInfoDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RecipeBriefInfoDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RecipeBriefInfoDto.prototype, "servings", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RecipeBriefInfoDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RecipeBriefInfoDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RecipeBriefInfoDto.prototype, "preparationTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RecipeBriefInfoDto.prototype, "totalCalories", void 0);
//# sourceMappingURL=recipe.dtos.js.map