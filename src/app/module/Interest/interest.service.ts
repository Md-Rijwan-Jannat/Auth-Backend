import { IInterest } from "./interest.interface";
import Interest from "./interest.model";

const createInterest = async (name: string): Promise<IInterest> => {
  return await Interest.create({ name });
};

const getAllInterests = async (): Promise<IInterest[]> => {
  return await Interest.find();
};

const getInterestById = async (id: string): Promise<IInterest | null> => {
  return await Interest.findById(id);
};

const deleteInterest = async (id: string): Promise<IInterest | null> => {
  return await Interest.findByIdAndDelete(id);
};

export const InterestService = {
  createInterest,
  getAllInterests,
  getInterestById,
  deleteInterest,
};
