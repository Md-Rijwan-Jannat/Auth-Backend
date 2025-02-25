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
exports.NotificationService = exports.getUnreadCount = exports.deleteNotification = exports.markNotificationAsRead = exports.getNotificationById = exports.getNotifications = exports.createNotification = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const notification_model_1 = require("./notification.model");
const auth_model_1 = __importDefault(require("../Auth/auth.model"));
const createNotification = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_model_1.Notification.create(Object.assign(Object.assign({}, data), { user: userId }));
});
exports.createNotification = createNotification;
const getNotifications = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    if (result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No notifications found for the user");
    }
    return result;
});
exports.getNotifications = getNotifications;
const getNotificationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findById(id);
    if (!notification)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    return notification;
});
exports.getNotificationById = getNotificationById;
const markNotificationAsRead = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    return notification;
});
exports.markNotificationAsRead = markNotificationAsRead;
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findByIdAndDelete(id);
    if (!notification)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
});
exports.deleteNotification = deleteNotification;
const getUnreadCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userId", userId);
    const user = yield auth_model_1.default.findById(userId);
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    return yield notification_model_1.Notification.countDocuments({ user: userId, read: false });
});
exports.getUnreadCount = getUnreadCount;
exports.NotificationService = {
    createNotification: exports.createNotification,
    getNotifications: exports.getNotifications,
    getNotificationById: exports.getNotificationById,
    markNotificationAsRead: exports.markNotificationAsRead,
    deleteNotification: exports.deleteNotification,
    getUnreadCount: exports.getUnreadCount,
};
