import { Request, Response } from "express";
import { InterestService } from "./interest.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createInterest = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  const interest = await InterestService.createInterest(name);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Interest created successfully",
    data: interest,
  });
});

const getAllInterests = catchAsync(async (req: Request, res: Response) => {
  const interests = await InterestService.getAllInterests();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Interests fetched successfully",
    data: interests,
  });
});

const getInterestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const interest = await InterestService.getInterestById(id);

  if (!interest) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Interest not found",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Interest fetched successfully",
    data: interest,
  });
});

const deleteInterest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedInterest = await InterestService.deleteInterest(id);

  if (!deletedInterest) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Interest not found",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Interest deleted successfully",
    data: deletedInterest,
  });
});

export const InterestController = {
  createInterest,
  getAllInterests,
  getInterestById,
  deleteInterest,
};
