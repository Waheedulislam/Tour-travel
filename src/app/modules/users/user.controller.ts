import { NextFunction, Request, response, Response } from 'express';

import { userServices } from './user.services';
import { sendResponse } from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userServices.createUser(payload);

  // res.status(201).json({
  //   status: true,
  //   message: 'User created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});
const getUser = catchAsync(async (req, res) => {
  const result = await userServices.getUser();

  // res.send({
  //   status: true,
  //   message: 'Users get successfully',
  //   result,
  // });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User get successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await userServices.getSingleUser(userId);

  // res.send({
  //   status: true,
  //   message: 'Single user get successfully',
  //   result,
  // });
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

  // res.send({
  //   status: true,
  //   message: 'User update successfully',
  //   result,
  // });
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

    // res.send({
    //   status: true,
    //   message: 'Users delete successfully',
    //   result,
    // });
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User deleted successfully',
      data: {},
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
