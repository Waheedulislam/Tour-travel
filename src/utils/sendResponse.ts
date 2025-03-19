import { Request, Response } from 'express';

type TSuccessResponse<T> = {
  status?: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data: T | T[] | null;
};

export const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).send({
    success: data.status ?? true,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};
