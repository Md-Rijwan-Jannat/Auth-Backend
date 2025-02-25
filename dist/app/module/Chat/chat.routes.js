"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("./chat.controller");
const auth_constants_1 = require("../Auth/auth.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const chat_validation_1 = require("./chat.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), (0, validateRequest_1.default)(chat_validation_1.ChatValidation.chatValidationSchema), chat_controller_1.ChatController.createChat);
router.get("/:userId", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), chat_controller_1.ChatController.getUserChats);
router.get("/single/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), chat_controller_1.ChatController.getChatById);
router.delete("/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), chat_controller_1.ChatController.deleteChat);
exports.ChatRoutes = router;
