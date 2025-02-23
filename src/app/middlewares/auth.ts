import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { USER_ROLE, USER_STATUS } from "../module/Auth/auth.constants";
import catchAsync from "../utils/catchAsync";
import { verifyToken } from "../utils/tokenGenerateFunction";
import config from "../../config";
import User from "../module/Auth/auth.model";

const Auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted

    const status = user?.status;

    if (status === USER_STATUS.BLOCKED) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default Auth;
