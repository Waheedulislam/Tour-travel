import { Schema, model, connect } from 'mongoose';
import { TTour } from './tour.interface';

// 2. Create a Schema corresponding to the document interface.
const tourSchema = new Schema<TTour>({
  name: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  image: [String],
  startDate: {
    type: Date,
  },
  startLocation: {
    type: String,
  },
  location: [String],
  slag: {
    type: String,
  },
  availableSets: {
    type: Number,
    required: true,
  },
});

const Tour = model<TTour>('Tour', tourSchema);

export default Tour;
