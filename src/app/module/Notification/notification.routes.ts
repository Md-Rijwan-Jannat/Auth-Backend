import express from "express";
import { NotificationValidation } from "./notification.validation";
import { NotificationController } from "./notification.controller";
import validateRequest from "../../middlewares/validateRequest";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

router.post(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(NotificationValidation.createNotification),
  NotificationController.createNotification
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  NotificationController.getNotifications
);
router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  NotificationController.getNotificationById
);
router.get(
  "/unread-count/me",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  NotificationController.getUnreadCount
);
router.patch(
  "/:id/read",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  NotificationController.markNotificationAsRead
);
router.delete(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  NotificationController.deleteNotification
);

export const NotificationRoutes = router;
