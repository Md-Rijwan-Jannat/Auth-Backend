"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// Create JWT token for a user.
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn,
    });
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
// Generate access and refresh tokens for a user.
const generateTokens = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.default.jwt_access_secret, { expiresIn: config_1.default.jwt_access_expires_in });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwt_refresh_secret, { expiresIn: config_1.default.jwt_refresh_expires_in });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
