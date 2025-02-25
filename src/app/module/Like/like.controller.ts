import { Request, Response } from "express";
import { LikeService } from "./like.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const likeUser = catchAsync(async (req: Request, res: Response) => {
  const likerId = req.user.id;
  const likedId = req.params.userId;

  // Call the service to like the user and check for a match
  const result = await LikeService.likeUser(likerId, likedId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Like successful, and match created if mutual.",
    data: result,
  });
});

export const LikeController = {
  likeUser,
};
