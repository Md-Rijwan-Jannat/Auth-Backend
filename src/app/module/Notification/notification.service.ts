import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Notification } from "./notification.model";
import User from "../Auth/auth.model";

export const createNotification = async (
  data: {
    type: string;
    message: string;
  },
  userId: string
) => {
  return await Notification.create({ ...data, user: userId });
};

export const getNotifications = async (
  userId: string,
  page: number,
  limit: number
) => {
  const result = await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  if (result.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No notifications found for the user"
    );
  }

  return result;
};

export const getNotificationById = async (id: string) => {
  const notification = await Notification.findById(id);
  if (!notification)
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  return notification;
};

export const markNotificationAsRead = async (id: string) => {
  const notification = await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );
  if (!notification)
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  return notification;
};

export const deleteNotification = async (id: string) => {
  const notification = await Notification.findByIdAndDelete(id);
  if (!notification)
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
};

export const getUnreadCount = async (userId: string) => {
  console.log("userId", userId);
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  return await Notification.countDocuments({ user: userId, read: false });
};

export const NotificationService = {
  createNotification,
  getNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
  getUnreadCount,
};
