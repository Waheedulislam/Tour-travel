import { TTour } from './tour.interface';
import Tour from './tour.model';

const createTours = async (payload: TTour) => {
  const result = await Tour.create(payload);
  return result;
};

const getTours = async () => {
  const result = Tour.find();
  return result;
};

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id);
  return result;
};
const updateTour = async (id: string, payload: Partial<TTour>) => {
  const result = Tour.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteTour = async (id: string, payload: Partial<TTour>) => {
  const result = Tour.findByIdAndDelete(id);
  return result;
};

export const tourServices = {
  createTours,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
};
