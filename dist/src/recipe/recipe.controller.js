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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const recipe_dtos_1 = require("./dtos/recipe.dtos");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
let RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    getRecipes(query) {
        return this.recipeService.getRecipes(query);
    }
    getLatestRecipes(query) {
        return this.recipeService.getLatestRecipes(query);
    }
    getMostPopularRecipes(query) {
        return this.recipeService.getMostPopularRecipes(query);
    }
    getRecipesByCategory(query) {
        return this.recipeService.getRecipesByCategory(query);
    }
    getRecipesByUser(query) {
        return this.recipeService.getRecipesByUser(query);
    }
    addRecipe(body) {
        return this.recipeService.createRecipe(body);
    }
    editRecipePhoto(body) {
        return this.recipeService.editRecipePhoto(body);
    }
    editRecipe(body) {
        return this.recipeService.editRecipe(body);
    }
    getRecipe(id) {
        return this.recipeService.getRecipe(parseInt(id));
    }
    updateViewCount(id) {
        return this.recipeService.updateViewCount(parseInt(id));
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.RecipesDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getRecipes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/latest"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.LatestRecipesDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getLatestRecipes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/most-popular"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.MostPopularRecipesDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getMostPopularRecipes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/by-category"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.ByCategoryRecipesDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getRecipesByCategory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/user-recipes"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.RecipesPerUserDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getRecipesByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(new serialize_interceptor_1.SerializeInterceptor(recipe_dtos_1.RecipeBriefInfoDto)),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("/add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.CreateRecipeDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "addRecipe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(202),
    (0, common_1.Put)("/edit-photo"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.EditRecipePhotoDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "editRecipePhoto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(202),
    (0, common_1.Put)("/edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_dtos_1.EditRecipeDto]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "editRecipe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "getRecipe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)("/:id/view"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "updateViewCount", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)("recipes"),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map