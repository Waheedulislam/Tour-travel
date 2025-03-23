import { NextFunction, Request, response, Response } from 'express';

import { userServices } from './user.services';
import { sendResponse } from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userServices.createUser(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});
const getUser = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const result = await userServices.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User get successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await userServices.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single user get successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const body = req.body;
  const userId = req.params.userId;
  const result = await userServices.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User update successfully',
    data: result,
  });
});
const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    console.log(userId);
    const result = await userServices.deleteUser(userId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User deleted successfully',
      data: { result },
    });
  },
);
export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
