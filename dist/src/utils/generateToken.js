"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
function generateToken(length) {
    if (length === 4) {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    else if (length === 6) {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    else {
        throw new Error('Unsupported token length');
    }
}
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map