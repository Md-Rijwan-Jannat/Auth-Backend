import { Router } from "express";
import { MessageController } from "./message.controller";
import { USER_ROLE } from "../Auth/auth.constants";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { MessageValidation } from "./message.validation";

const router = Router();

router.post(
  "/send",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(MessageValidation.messageValidationSchema),
  MessageController.sendMessage
);
router.get(
  "/:chatId",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  MessageController.getMessages
);
router.patch(
  "/read/:messageId",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  MessageController.markMessageAsRead
);
router.put(
  "/:messageId",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  MessageController.updateMessage
);
router.delete(
  "/:messageId",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  MessageController.deleteMessage
);

export const MessagesRoutes = router;
