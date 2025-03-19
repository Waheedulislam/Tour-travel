import mongoose from 'mongoose';
import Tour from '../tour/tour.model';
import { IBooking } from './booking.interface';
import { BookingModel } from './booking.model';

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { tour, bookingSlots } = payload;

    const requiredTour = await Tour.findById(tour);

    if (!requiredTour) {
      throw new Error('Tour is not found');
    }
    const totalPrice = requiredTour.price * bookingSlots;

    payload.totalPrice = totalPrice;
    payload.bookingStatus = 'pending';

    if (requiredTour.availableSets < bookingSlots) {
      throw new Error('Not enough seats available');
    }

    const booking = await BookingModel.create([payload], { session });

    // availableSeats= availableSeats - bookingSlots
    const updateTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSets: -bookingSlots } },
      { new: true, runValidators: true },
    );
    console.log(updateTour);

    if (!updateTour) {
      throw new Error('Tour is not updateTour');
    }

    await session.commitTransaction();
    await session.endSession();
    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// const getUser = async () => {
//   const result = await BookingModel.find();
//   return result;
// };
// const getSingleUser = async (id: string) => {
//   const result = await BookingModel.findById(id);
//   return result;
// };
// const updateUser = async (id: string, payload: TUser) => {
//   const result = await BookingModel.findByIdAndUpdate(id, payload, {
//     new: true,
//   });
//   return result;
// };
// const deleteUser = async (id: string) => {
//   const result = await BookingModel.findByIdAndDelete(id);
//   return result;
// };

export const BookingServices = {
  createBooking,
};
