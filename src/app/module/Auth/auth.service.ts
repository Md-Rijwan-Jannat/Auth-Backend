import bcrypt from "bcrypt";
import User from "./auth.model";
import { generateTokens } from "../../utils/tokenGenerateFunction";
import config from "../../../config";
import { IUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const register = async (payload: IUser) => {
  const user = await User.create(payload);
  const tokens = generateTokens(user);
  return { user, ...tokens };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const isMatch = await user.comparePassword(payload.password);

  // Log the result of the password comparison
  console.log(`Password Match: ${isMatch}`);

  if (!isMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  const tokens = generateTokens(user);
  return { user, ...tokens };
};

const logout = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");
  // Clear session, token, or blacklist JWT if necessary
  return true;
};

const updatePassword = async (
  userId: string,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const isMatch = await bcrypt.compare(payload.oldPassword, user.password);

  console.log(isMatch, user);
  if (!isMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect old password");

  user.password = payload.newPassword;

  await user.save();
};

const deleteAccount = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

export const AuthService = {
  register,
  login,
  logout,
  updatePassword,
};
