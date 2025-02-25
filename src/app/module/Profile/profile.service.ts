import User from "../Auth/auth.model";

const getCurrentUser = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

const updateProfile = async (userId: string, payload: { name?: string }) => {
  return await User.findByIdAndUpdate(userId, payload, { new: true }).select(
    "-password"
  );
};

const deleteAccount = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

export const ProfileService = {
  getCurrentUser,
  updateProfile,
  deleteAccount,
};
