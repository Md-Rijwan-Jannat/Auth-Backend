import User from "../module/Auth/auth.model";
import config from "../../config";
import { UserRole, UserStatus } from "../module/Auth/auth.interface";

const seedAdmin = async (): Promise<void> => {
  try {
    const existingAdmin = await User.findOne({ email: config.admin_email });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    await User.create({
      name: "Admin",
      email: config.admin_email,
      password: config.admin_password,
      age: 35,
      gender: "male",
      location: "New York, USA",
      role: UserRole.admin,
      status: UserStatus.in_progress,
      interests: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

export default seedAdmin;
