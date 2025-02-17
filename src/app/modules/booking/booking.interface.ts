import mongoose from 'mongoose';

export type IBooking = {
  user: mongoose.Schema.Types.ObjectId;
  tour: mongoose.Schema.Types.ObjectId;
  bookingSlots: number;
  bookingStatus: 'pending' | 'paid' | 'canceled';
  totalPrice: number;
};
