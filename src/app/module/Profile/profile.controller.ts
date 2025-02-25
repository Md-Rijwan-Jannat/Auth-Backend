import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProfileService } from "./profile.service";

const getCurrentUser = catchAsync(async (req, res) => {
  const result = await ProfileService.getCurrentUser(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await ProfileService.updateProfile(req.user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const deleteAccount = catchAsync(async (req, res) => {
  await ProfileService.deleteAccount(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account deleted successfully",
  });
});

export const ProfileController = {
  getCurrentUser,
  updateProfile,
  deleteAccount,
};
