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
const mongoose_1 = require("mongoose");
const auth_interface_1 = require("./auth.interface");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "non-binary"],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(auth_interface_1.UserRole),
        default: auth_interface_1.UserRole.USER,
    },
    status: {
        type: String,
        enum: Object.values(auth_interface_1.UserStatus),
        default: auth_interface_1.UserStatus.in_progress,
    },
    bio: { type: String },
    profilePhoto: { type: String },
    interests: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Interest",
        },
    ],
}, { timestamps: true });
// Hash password before saving
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 10);
        next();
    });
});
// Compare hashed passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(candidatePassword, this.password);
    });
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
