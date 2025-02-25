"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../module/Auth/auth.routes");
const interest_routes_1 = require("../module/Interest/interest.routes");
const like_routes_1 = require("../module/Like/like.routes");
const match_routes_1 = require("../module/Match/match.routes");
const blindChat_routes_1 = require("../module/BlindChat/blindChat.routes");
const chat_routes_1 = require("../module/Chat/chat.routes");
const message_routes_1 = require("../module/Message/message.routes");
const notification_routes_1 = require("../module/Notification/notification.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/interests",
        route: interest_routes_1.InterestRoutes,
    },
    {
        path: "/like",
        route: like_routes_1.LikeRoutes,
    },
    {
        path: "/matchings",
        route: match_routes_1.MatchingRoutes,
    },
    {
        path: "/blind-chats",
        route: blindChat_routes_1.BlindChatRoutes,
    },
    {
        path: "/chats",
        route: chat_routes_1.ChatRoutes,
    },
    {
        path: "/messages",
        route: message_routes_1.MessagesRoutes,
    },
    {
        path: "/notifications",
        route: notification_routes_1.NotificationRoutes,
    },
];
// This will automatically loop your routes that you will add in the moduleRoutes array
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
