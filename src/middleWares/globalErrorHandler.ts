import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { handleGenericError } from '../helpers/handleGenericError';
import { handleDuplicateError } from './handleDuplicateError';
import { handleCastError } from './handleCastError';
import { handleValidationError } from './handleValidationError';
import { handleZodError } from './zodErrorHandler';

type TErrorResponse = {
  success: boolean;
  message: string;
  error: any;
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  }
  // cast Error
  else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  }
  //   validation error
  else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  }
  //   duplicate error
  else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  }
  // any error
  else if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      name: err.name,
      message: `Any Error:${err.message}`,
      error: err,
    });
  }
  // any error
  else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
