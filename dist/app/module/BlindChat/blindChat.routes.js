"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindChatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blindChat_controller_1 = require("./blindChat.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../Auth/auth.constants");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blindChat_validation_1 = require("./blindChat.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), (0, validateRequest_1.default)(blindChat_validation_1.BlindChatValidation.blindChatValidationSchema), blindChat_controller_1.BlindChatController.createBlindChat);
router.get("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), blindChat_controller_1.BlindChatController.getBlindChats);
router.get("/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), blindChat_controller_1.BlindChatController.getBlindChatById);
router.patch("/:id/expire", (0, validateRequest_1.default)(blindChat_validation_1.BlindChatValidation.updateBlindChatValidationSchema), (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), blindChat_controller_1.BlindChatController.expireBlindChat);
exports.BlindChatRoutes = router;
