import bcrypt from "bcrypt";
import User from "../module/Auth/auth.model";
import config from "../../config";
import { UserRole, UserStatus } from "../module/Auth/auth.interface";

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: config.admin_email });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      config.admin_password as string,
      Number(config.bcrypt_salt_rounds) || 10
    );

    await User.create({
      name: "Admin",
      email: config.admin_email,
      password: hashedPassword,
      role: UserRole.ADMIN,
      status: UserStatus.IN_PROGRESS,
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

export default seedAdmin;
