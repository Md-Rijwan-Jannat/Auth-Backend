import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { NotificationService } from "./notification.service";
import sendResponse from "../../utils/sendResponse";

/**
 * Create a new notification
 * @route POST /api/v1/notifications
 * @access Private
 */
const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = await NotificationService.createNotification(
    req.body,
    req.user.id
  );
  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Notification created successfully",
    data: notification,
  });
});

/**
 * Retrieve all notifications for a user
 * @route GET /api/v1/notifications
 * @access Private
 */
const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const notifications = await NotificationService.getNotifications(
    req.user.id as string,
    Number(page),
    Number(limit)
  );
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Notifications retrieved successfully",
    data: notifications,
  });
});

/**
 * Retrieve a single notification by ID
 * @route GET /api/v1/notifications/:id
 * @access Private
 */
const getNotificationById = catchAsync(async (req: Request, res: Response) => {
  const notification = await NotificationService.getNotificationById(
    req.params.id
  );
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Notification retrieved successfully",
    data: notification,
  });
});

/**
 * Mark a notification as read
 * @route PATCH /api/v1/notifications/:id/read
 * @access Private
 */
const markNotificationAsRead = catchAsync(
  async (req: Request, res: Response) => {
    const notification = await NotificationService.markNotificationAsRead(
      req.params.id
    );
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notification marked as read",
      data: notification,
    });
  }
);

/**
 * Delete a notification
 * @route DELETE /api/v1/notifications/:id
 * @access Private
 */
const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  await NotificationService.deleteNotification(req.params.id);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Notification deleted successfully",
    data: null,
  });
});

/**
 * Get the count of unread notifications for a user
 * @route GET /api/v1/notifications/unread-count
 * @access Private
 */
const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const count = await NotificationService.getUnreadCount(req.user.id as string);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Unread notification count retrieved",
    data: { unreadCount: count },
  });
});

export const NotificationController = {
  createNotification,
  getNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
  getUnreadCount,
};
