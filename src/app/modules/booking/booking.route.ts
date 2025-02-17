import { Router } from 'express';
import { BookingController } from './booking.controller';

const bookingRouter = Router();

bookingRouter.post('/create-booking', BookingController.createBooking);
// bookingRouter.get('/:id', BookingController.);
// bookingRouter.get('/', BookingController.);
// bookingRouter.patch('/:id', BookingController.);
// bookingRouter.delete('/:id', BookingController.);

export default bookingRouter;
