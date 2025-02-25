import express from "express";
import Auth from "../../middlewares/auth"; // Assuming you have an auth middleware
import { USER_ROLE } from "../Auth/auth.constants"; // Assuming you have user roles defined
import { MatchingController } from "./match.controller";

const router = express.Router();

// Get match suggestions based on interests
router.get(
  "/suggestions",
  Auth(USER_ROLE.user),
  MatchingController.getSuggestedMatches
);

// Pass on a profile
router.post("/pass/:userId", Auth(USER_ROLE.user), MatchingController.passUser);

// Get all matched users
router.get("/matches", Auth(USER_ROLE.user), MatchingController.getUserMatches);

// Unmatch a user
router.delete(
  "/unmatch/:id",
  Auth(USER_ROLE.user),
  MatchingController.unmatchUser
);

export const MatchingRoutes = router;
