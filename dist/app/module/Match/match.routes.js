"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth")); // Assuming you have an auth middleware
const auth_constants_1 = require("../Auth/auth.constants"); // Assuming you have user roles defined
const match_controller_1 = require("./match.controller");
const router = express_1.default.Router();
// Get match suggestions based on interests
router.get("/suggestions", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), match_controller_1.MatchingController.getSuggestedMatches);
// Pass on a profile
router.post("/pass/:userId", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), match_controller_1.MatchingController.passUser);
// Get all matched users
router.get("/matches", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), match_controller_1.MatchingController.getUserMatches);
// Unmatch a user
router.delete("/unmatch/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.user), match_controller_1.MatchingController.unmatchUser);
exports.MatchingRoutes = router;
