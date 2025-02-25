"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = __importDefault(require("./auth.model"));
const tokenGenerateFunction_1 = require("../../utils/tokenGenerateFunction");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.create(payload);
    const tokens = (0, tokenGenerateFunction_1.generateTokens)(user);
    return Object.assign({ user }, tokens);
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findOne({ email: payload.email }).select("+password");
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    const isMatch = yield user.comparePassword(payload.password);
    // Log the result of the password comparison
    console.log(`Password Match: ${isMatch}`);
    if (!isMatch)
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    const tokens = (0, tokenGenerateFunction_1.generateTokens)(user);
    return Object.assign({ user }, tokens);
});
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findById(userId);
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    // Clear session, token, or blacklist JWT if necessary
    return true;
});
const getCurrentUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield auth_model_1.default.findById(userId).select("-password");
});
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield auth_model_1.default.findByIdAndUpdate(userId, payload, { new: true }).select("-password");
});
const updatePassword = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findById(userId).select("+password");
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    const isMatch = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    console.log(isMatch, user);
    if (!isMatch)
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect old password");
    user.password = payload.newPassword;
    yield user.save();
});
const deleteAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_model_1.default.findByIdAndDelete(userId);
});
exports.AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    updateProfile,
    updatePassword,
    deleteAccount,
};
