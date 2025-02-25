"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesRoutes = void 0;
const express_1 = require("express");
const message_controller_1 = require("./message.controller");
const auth_constants_1 = require("../Auth/auth.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const message_validation_1 = require("./message.validation");
const router = (0, express_1.Router)();
router.post("/send", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), (0, validateRequest_1.default)(message_validation_1.MessageValidation.messageValidationSchema), message_controller_1.MessageController.sendMessage);
router.get("/:chatId", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), message_controller_1.MessageController.getMessages);
router.patch("/read/:messageId", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), message_controller_1.MessageController.markMessageAsRead);
router.put("/:messageId", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), message_controller_1.MessageController.updateMessage);
router.delete("/:messageId", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin, auth_constants_1.USER_ROLE.user), message_controller_1.MessageController.deleteMessage);
exports.MessagesRoutes = router;
