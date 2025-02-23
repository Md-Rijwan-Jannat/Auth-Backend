import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.database_url,
  jwt_access_secret: process.env.jwt_access_secret,
  jwt_access_expires_in: process.env.jwt_access_expires_in,
  jwt_refresh_secret: process.env.jwt_refresh_secret,
  jwt_refresh_expires_in: process.env.jwt_refresh_expires_in,
  admin_email: process.env.admin_email,
  admin_password: process.env.admin_password,
  admin_mobile_number: process.env.admin_mobile_number,
  admin_image: process.env.admin_image,
  reset_link_url: process.env.reset_link_url,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
};
