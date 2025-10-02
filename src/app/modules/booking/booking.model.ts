import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'paid', 'canceled'],
      required: true,
    },
    bookingSlots: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// 3. Create a Model.
export const BookingModel = model<IBooking>('Booing', bookingSchema);
