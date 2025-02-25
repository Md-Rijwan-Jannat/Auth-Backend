import express from "express";
import { InterestController } from "./interest.controller";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

router.post("/", Auth(USER_ROLE.admin), InterestController.createInterest);
router.get("/", InterestController.getAllInterests);
router.get("/:id", InterestController.getInterestById);
router.delete("/:id", Auth(USER_ROLE.admin), InterestController.deleteInterest);

export const InterestRoutes = router;
