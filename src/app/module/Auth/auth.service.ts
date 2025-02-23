// auth.service.ts
import bcrypt from "bcrypt";
import User from "./auth.model";
import { generateTokens } from "../../utils/tokenGenerateFunction";

const register = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  payload.password = await bcrypt.hash(payload.password, 10);
  const user = await User.create(payload);
  const tokens = generateTokens(user);
  return { user, ...tokens };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const tokens = generateTokens(user);
  return { user, ...tokens };
};

export const AuthService = {
  register,
  login,
};
