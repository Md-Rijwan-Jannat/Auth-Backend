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
exports.NotificationController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const notification_service_1 = require("./notification.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
/**
 * Create a new notification
 * @route POST /api/v1/notifications
 * @access Private
 */
const createNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_service_1.NotificationService.createNotification(req.body, req.user.id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Notification created successfully",
        data: notification,
    });
}));
/**
 * Retrieve all notifications for a user
 * @route GET /api/v1/notifications
 * @access Private
 */
const getNotifications = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const notifications = yield notification_service_1.NotificationService.getNotifications(req.user.id, Number(page), Number(limit));
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Notifications retrieved successfully",
        data: notifications,
    });
}));
/**
 * Retrieve a single notification by ID
 * @route GET /api/v1/notifications/:id
 * @access Private
 */
const getNotificationById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_service_1.NotificationService.getNotificationById(req.params.id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Notification retrieved successfully",
        data: notification,
    });
}));
/**
 * Mark a notification as read
 * @route PATCH /api/v1/notifications/:id/read
 * @access Private
 */
const markNotificationAsRead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_service_1.NotificationService.markNotificationAsRead(req.params.id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Notification marked as read",
        data: notification,
    });
}));
/**
 * Delete a notification
 * @route DELETE /api/v1/notifications/:id
 * @access Private
 */
const deleteNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield notification_service_1.NotificationService.deleteNotification(req.params.id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Notification deleted successfully",
        data: null,
    });
}));
/**
 * Get the count of unread notifications for a user
 * @route GET /api/v1/notifications/unread-count
 * @access Private
 */
const getUnreadCount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield notification_service_1.NotificationService.getUnreadCount(req.user.id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Unread notification count retrieved",
        data: { unreadCount: count },
    });
}));
exports.NotificationController = {
    createNotification,
    getNotifications,
    getNotificationById,
    markNotificationAsRead,
    deleteNotification,
    getUnreadCount,
};
