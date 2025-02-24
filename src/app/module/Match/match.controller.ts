import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MatchingService } from "./match.service";

const getSuggestedMatches = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id; // Assuming user ID is available in the request
  const suggestions = await MatchingService.getSuggestedMatches(userId);
  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "Suggestions get successfully",
    data: suggestions,
  });
});

const likeUser = catchAsync(async (req: Request, res: Response) => {
  const likedUserId = req.params.userId;
  const likingUserId = req.user.id; // Assuming the logged-in user ID
  const match = await MatchingService.likeUser(likingUserId, likedUserId);
  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "User liked successfully",
    data: match,
  });
});

const passUser = catchAsync(async (req: Request, res: Response) => {
  const passedUserId = req.params.userId;
  const passingUserId = req.user.id; // Assuming the logged-in user ID
  const result = await MatchingService.passUser(passingUserId, passedUserId);
  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "User passed successfully",
    data: result,
  });
});

const getUserMatches = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id; // Assuming user ID is available in the request
  const matches = await MatchingService.getUserMatches(userId);
  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "User matches fetched successfully",
    data: matches,
  });
});

const unmatchUser = catchAsync(async (req: Request, res: Response) => {
  const matchId = req.params.id;
  const unmatch = await MatchingService.unmatchUser(matchId);
  sendResponse(res, {
    success: false,
    statusCode: 200,
    message: "User unmatched successfully",
    data: unmatch,
  });
});

export const MatchingController = {
  getSuggestedMatches,
  likeUser,
  passUser,
  getUserMatches,
  unmatchUser,
};
