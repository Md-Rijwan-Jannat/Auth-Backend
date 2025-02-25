import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constants";
import { AuthValidation } from "../Auth/auth.validation";
import { ProfileController } from "./profile.controller";

const router = express.Router();

router.get(
  "/me",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ProfileController.getCurrentUser
);
router.put(
  "/update-profile",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.updateProfile),
  ProfileController.updateProfile
);
router.delete(
  "/delete-account",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ProfileController.deleteAccount
);

export const ProfileRoutes = router;
