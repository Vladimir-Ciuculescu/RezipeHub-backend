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
exports.GetFavoritesDto = exports.IsFavoriteDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class IsFavoriteDto {
}
exports.IsFavoriteDto = IsFavoriteDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], IsFavoriteDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.recipeId)),
    __metadata("design:type", Number)
], IsFavoriteDto.prototype, "recipeId", void 0);
class GetFavoritesDto {
}
exports.GetFavoritesDto = GetFavoritesDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.page)),
    __metadata("design:type", Number)
], GetFavoritesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.limit)),
    __metadata("design:type", Number)
], GetFavoritesDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ obj }) => parseInt(obj.userId)),
    __metadata("design:type", Number)
], GetFavoritesDto.prototype, "userId", void 0);
//# sourceMappingURL=favorites.dto.js.map