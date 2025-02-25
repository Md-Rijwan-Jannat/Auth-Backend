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
exports.InterestController = void 0;
const interest_service_1 = require("./interest.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createInterest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const interest = yield interest_service_1.InterestService.createInterest(name);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Interest created successfully",
        data: interest,
    });
}));
const getAllInterests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interests = yield interest_service_1.InterestService.getAllInterests();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Interests fetched successfully",
        data: interests,
    });
}));
const getInterestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const interest = yield interest_service_1.InterestService.getInterestById(id);
    if (!interest) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "Interest not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Interest fetched successfully",
        data: interest,
    });
}));
const deleteInterest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedInterest = yield interest_service_1.InterestService.deleteInterest(id);
    if (!deletedInterest) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "Interest not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Interest deleted successfully",
        data: deletedInterest,
    });
}));
exports.InterestController = {
    createInterest,
    getAllInterests,
    getInterestById,
    deleteInterest,
};
