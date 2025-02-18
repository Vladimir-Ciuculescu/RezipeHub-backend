"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeType = exports.TokenType = exports.Platforms = exports.SocialProvider = void 0;
var SocialProvider;
(function (SocialProvider) {
    SocialProvider["GOOGLE"] = "GOOGLE";
    SocialProvider["FACEBOOK"] = "FACEBOOK";
})(SocialProvider || (exports.SocialProvider = SocialProvider = {}));
var Platforms;
(function (Platforms) {
    Platforms["android"] = "android";
    Platforms["ios"] = "ios";
})(Platforms || (exports.Platforms = Platforms = {}));
var TokenType;
(function (TokenType) {
    TokenType["ACCOUNT_VERIFICATION"] = "ACCOUNT_VERIFICATION";
    TokenType["PASSWORD_RESET"] = "PASSWORD_RESET";
})(TokenType || (exports.TokenType = TokenType = {}));
var RecipeType;
(function (RecipeType) {
    RecipeType["PIZZA"] = "Pizza";
    RecipeType["HAMBURGER"] = "Hamburger";
    RecipeType["ASIATIC"] = "Asiatic";
    RecipeType["BURRITO"] = "Burrito";
    RecipeType["NOODLES"] = "Noodles";
    RecipeType["PASTA"] = "Pasta";
    RecipeType["SEA_FOOD"] = "Sea food";
    RecipeType["BARBECUE"] = "Barbecue";
    RecipeType["FISH"] = "Fish";
    RecipeType["SALAD"] = "Salad";
    RecipeType["APPETIZER"] = "Appetizer";
    RecipeType["KEBAB"] = "Kebab";
    RecipeType["SUSHI"] = "Sushi";
    RecipeType["BRUNCH"] = "Brunch";
    RecipeType["SANDWICH"] = "Sandwich";
    RecipeType["COFFEE"] = "Coffee";
    RecipeType["TACO"] = "Taco";
    RecipeType["VEGETARIAN"] = "Vegetarian";
    RecipeType["VEGAN"] = "Vegan";
    RecipeType["OTHER"] = "Other";
})(RecipeType || (exports.RecipeType = RecipeType = {}));
//# sourceMappingURL=enums.js.map