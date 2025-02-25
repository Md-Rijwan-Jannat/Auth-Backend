import express from "express";
import { LikeController } from "./like.controller";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

// Route to like a user and potentially create a match
router.post(
  "/:userId",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  LikeController.likeUser
);

export const LikeRoutes = router;
