import express from "express";
import { BlindChatController } from "./blindChat.controller";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constants";
import validateRequest from "../../middlewares/validateRequest";
import { BlindChatValidation } from "./blindChat.validation";

const router = express.Router();

router.post(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlindChatValidation.blindChatValidationSchema),
  BlindChatController.createBlindChat
);
router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  BlindChatController.getBlindChats
);
router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  BlindChatController.getBlindChatById
);
router.patch(
  "/:id/expire",
  validateRequest(BlindChatValidation.updateBlindChatValidationSchema),
  Auth(USER_ROLE.admin, USER_ROLE.user),
  BlindChatController.expireBlindChat
);

export const BlindChatRoutes = router;
