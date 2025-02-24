import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "./auth.constants";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.register),
  AuthController.register
);
router.post(
  "/login",
  validateRequest(AuthValidation.login),
  AuthController.login
);
router.post(
  "/logout",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  AuthController.logout
);
router.get(
  "/me",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  AuthController.getCurrentUser
);
router.put(
  "/update-profile",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.updateProfile),
  AuthController.updateProfile
);
router.put(
  "/update-password",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePassword),
  AuthController.updatePassword
);
router.delete(
  "/delete-account",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  AuthController.deleteAccount
);

export const AuthRoutes = router;
