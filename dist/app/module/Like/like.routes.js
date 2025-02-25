"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("./like.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../Auth/auth.constants");
const router = express_1.default.Router();
// Route to like a user and potentially create a match
router.post("/:userId", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), like_controller_1.LikeController.likeUser);
exports.LikeRoutes = router;
