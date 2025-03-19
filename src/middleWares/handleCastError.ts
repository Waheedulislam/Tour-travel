import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleCastError = (err: any, res: Response) => {
  res.status(400).json({ success: false, message: err.message, error: err });
};
