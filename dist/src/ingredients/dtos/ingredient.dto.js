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
exports.EditIngredientDto = exports.CreateIngredientDto = exports.IngredientDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const units_dto_1 = require("../../units/dtos/units.dto");
class IngredientDto {
}
exports.IngredientDto = IngredientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IngredientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IngredientDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IngredientDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], IngredientDto.prototype, "calories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], IngredientDto.prototype, "carbs", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], IngredientDto.prototype, "proteins", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], IngredientDto.prototype, "fats", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IngredientDto.prototype, "foodId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => units_dto_1.CreateUnitDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], IngredientDto.prototype, "measures", void 0);
class CreateIngredientDto {
}
exports.CreateIngredientDto = CreateIngredientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIngredientDto.prototype, "foodId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIngredientDto.prototype, "name", void 0);
class EditIngredientDto {
}
exports.EditIngredientDto = EditIngredientDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditIngredientDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIngredientDto.prototype, "foodId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIngredientDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIngredientDto.prototype, "uri", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditIngredientDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditIngredientDto.prototype, "measure", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], EditIngredientDto.prototype, "calories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], EditIngredientDto.prototype, "carbs", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], EditIngredientDto.prototype, "proteins", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => value !== null),
    __metadata("design:type", Number)
], EditIngredientDto.prototype, "fats", void 0);
//# sourceMappingURL=ingredient.dto.js.map