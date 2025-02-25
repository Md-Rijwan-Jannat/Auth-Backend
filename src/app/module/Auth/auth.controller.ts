import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully",
  });
});

const getCurrentUser = catchAsync(async (req, res) => {
  const result = await AuthService.getCurrentUser(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await AuthService.updateProfile(req.user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const updatePassword = catchAsync(async (req, res) => {
  await AuthService.updatePassword(req.user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password updated successfully",
  });
});

const deleteAccount = catchAsync(async (req, res) => {
  await AuthService.deleteAccount(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account deleted successfully",
  });
});

export const AuthController = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  updatePassword,
  deleteAccount,
};
