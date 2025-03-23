import { Request, Response } from 'express';
import { tourServices } from './tour.service';
import catchAsync from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { sendImageCloudinary } from '../../../helpers/fileUploadHelper';

const createTours = catchAsync(async (req, res) => {
  const payload = JSON.parse(req.body.data);

  // image upload
  if (req.file) {
    const imageName = 'hello';
    const path = req.file.path;
    const { secure_url } = await sendImageCloudinary(imageName, path);
    payload.coverImage = secure_url;
  }

  console.log(payload);
  const result = await tourServices.createTours(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Tour created successfully',
    data: result,
  });
});

const getTours = catchAsync(async (req: Request, res: Response) => {
  const result = await tourServices.getTours(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour get successfully',
    data: result,
  });
});
const getSingleTours = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tourServices.getSingleTour(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single Tour get successfully',
    data: result,
  });
});
const updateTours = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;
  const result = await tourServices.updateTour(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour update successfully',
    data: result,
  });
});
const deleteTours = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;
  const result = await tourServices.deleteTour(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour delete successfully',
    data: result,
  });
});

export const tourController = {
  getSingleTours,
  getTours,
  createTours,
  updateTours,
  deleteTours,
};
