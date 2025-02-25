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
exports.InterestService = void 0;
const interest_model_1 = __importDefault(require("./interest.model"));
const createInterest = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield interest_model_1.default.create({ name });
});
const getAllInterests = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield interest_model_1.default.find();
});
const getInterestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield interest_model_1.default.findById(id);
});
const deleteInterest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield interest_model_1.default.findByIdAndDelete(id);
});
exports.InterestService = {
    createInterest,
    getAllInterests,
    getInterestById,
    deleteInterest,
};
