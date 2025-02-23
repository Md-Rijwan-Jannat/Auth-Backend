import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

// Create JWT token for a user.
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

// Generate access and refresh tokens for a user.
export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: config.jwt_access_expires_in as string }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expires_in as string }
  );

  return { accessToken, refreshToken };
};
