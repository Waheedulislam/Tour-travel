import { Request, Response } from 'express';
import { AuthServices } from './auth.services';
import catchAsync from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User is register successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { refreshToken } = result;

  // set token with cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.Node_Env === 'production',
    httpOnly: true,
  });
  console.log('refreshToken:', refreshToken);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User is login successfully',
    accessToken: result.accessToken,
    data: result.verifyUser,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.forgetPassword(req.body);
  console.log(result);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.ACCEPTED,
    message: 'Reset Password link sent to your email',
    data: null,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  // token= req.headers.authorization
  const result = await AuthServices.resetPassword(req.body);
  console.log(result);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.ACCEPTED,
    message: ' Password Reset successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'Access token is retrieved successfully',
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword,
  refreshToken,
};
