import express from "express";
import { ChatController } from "./chat.controller";
import { USER_ROLE } from "../Auth/auth.constants";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ChatValidation } from "./chat.validation";

const router = express.Router();

router.post(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(ChatValidation.chatValidationSchema),
  ChatController.createChat
);
router.get(
  "/:userId",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ChatController.getUserChats
);
router.get(
  "/single/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ChatController.getChatById
);
router.delete(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ChatController.deleteChat
);

export const ChatRoutes = router;
