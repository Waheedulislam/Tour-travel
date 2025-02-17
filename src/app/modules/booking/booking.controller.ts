import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await BookingServices.createBooking(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Booking created successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
