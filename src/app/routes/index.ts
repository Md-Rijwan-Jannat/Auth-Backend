import { Router } from "express";
import { AuthRoutes } from "../module/Auth/auth.routes";
import { InterestRoutes } from "../module/Interest/interest.routes";
import { LikeRoutes } from "../module/Like/like.routes";
import { MatchingRoutes } from "../module/Match/match.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/interests",
    route: InterestRoutes,
  },
  {
    path: "/like",
    route: LikeRoutes,
  },
  {
    path: "/matchings",
    route: MatchingRoutes,
  },
];

// This will automatically loop your routes that you will add in the moduleRoutes array
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
