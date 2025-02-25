"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const interest_controller_1 = require("./interest.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constants_1 = require("../Auth/auth.constants");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), interest_controller_1.InterestController.createInterest);
router.get("/", interest_controller_1.InterestController.getAllInterests);
router.get("/:id", interest_controller_1.InterestController.getInterestById);
router.delete("/:id", (0, auth_1.default)(auth_constants_1.USER_ROLE.admin), interest_controller_1.InterestController.deleteInterest);
exports.InterestRoutes = router;
