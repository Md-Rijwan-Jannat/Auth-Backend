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
const auth_model_1 = __importDefault(require("../module/Auth/auth.model"));
const config_1 = __importDefault(require("../../config"));
const auth_interface_1 = require("../module/Auth/auth.interface");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingAdmin = yield auth_model_1.default.findOne({ email: config_1.default.admin_email });
        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }
        yield auth_model_1.default.create({
            name: "Admin",
            email: config_1.default.admin_email,
            password: config_1.default.admin_password,
            age: 35,
            gender: "male",
            location: "New York, USA",
            role: auth_interface_1.UserRole.admin,
            status: auth_interface_1.UserStatus.in_progress,
            interests: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log("Admin user created successfully.");
    }
    catch (error) {
        console.error("Error seeding admin user:", error);
    }
});
exports.default = seedAdmin;
