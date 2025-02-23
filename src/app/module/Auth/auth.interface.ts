import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserStatus {
  IN_PROGRESS = "in-progress",
  BLOCKED = "blocked",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
